from typing import Annotated, Optional
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import models
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from schemas import UserBase, UserPrefBase
from utils.generate_token import generate_token
from utils.file_iterator import file_iterator
import os
import logging

logger = logging.getLogger(__name__)


USER_VIDEOS_DIR = "videos"
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.post("/api/users/create_user")
async def create_user(user: UserBase, db: db_dependency):
    token = generate_token()
    try:
        db_user = models.User(**user.model_dump(), spotify_link=None,discord_link=None,color_scheme=None,steam_link=None, token=token, admin=False)
        db.add(db_user)
        db.commit()
        return {"message": "User created succesfully", "token": token}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"There has been an error while creating the user: {e}")


@app.post('/api/users/update_user_preferences')
async def update_user_preferences(prefs: UserPrefBase, db: db_dependency):
    params = {
        "spotify_link": prefs.spotify_link,
        "discord_link": prefs.discord_link,
        "steam_link": prefs.steam_link,
        "color_scheme": prefs.color_scheme,
        "token": prefs.token
    }
    try:
        db.execute(statement=text("""UPDATE users SET spotify_link = :spotify_link, discord_link = :discord_link, steam_link = :steam_link, color_scheme = :color_scheme, page_state = 'active', WHERE token = :token;"""), params=params)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="User doesn't exist")
    


@app.get('/api/users/get_user_by_id')
async def get_user_by_id(id: int, db: db_dependency):
    results = db.execute(statement=text("""SELECT * FROM users WHERE user_id = :id"""), params={"id": id})
    row = results.fetchone()
    
    if row:
        column_names = results.keys()
        user_data = dict(zip(column_names, row))
        return user_data
    else:
        return {}




@app.get('/api/users/get_user_by_username')
async def get_user_by_username(username: str, db: db_dependency):
    query = text("""
        SELECT color_scheme, discord_link, steam_link, spotify_link, username, user_id
        FROM users
        WHERE username = :username
    """)
    results = db.execute(query, params={"username": username})
    row = results.fetchone()
    if row:
        column_names = results.keys()
        user_data = dict(zip(column_names, row))
        return user_data
    else:
        return {"message": "User is not in the database"}


@app.post("/api/users/upload_video")
async def upload_video(token: str, db: db_dependency, video: UploadFile = None):
    try:
        user_id_query = text("SELECT user_id FROM users WHERE token = :token")
        user_id_result = db.execute(user_id_query, {"token": token})
        user_id = user_id_result.scalar()

        user_video_dir = os.path.join(USER_VIDEOS_DIR, str(user_id))
        os.makedirs(user_video_dir, exist_ok=True)
        file_extension = os.path.splitext(video.filename)[-1]
        video_name = f"{user_id}_video{file_extension}"
        video_path = os.path.join(user_video_dir, video_name)

        if os.path.exists(video_path):
            os.remove(video_path)

        with open(video_path, "wb") as video_file:
            video_file.write(video.file.read())

        insert_query = text("INSERT INTO user_videos (user_id, video_name, video_location) VALUES (:user_id, :video_name, :video_location)")
        db.execute(insert_query, {"user_id": user_id, "video_name": video_name, "video_location": video_path})
        db.commit()

        return {"message": "Video uploaded successfully"}
    except Exception as e:
        db.rollback()
        logger.error(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"There has been an error while uploading the video: {e}")


@app.get("/api/users/stream-video/{user_id}")
async def stream_user_video(user_id: int, db: db_dependency):
    results = db.execute(text("SELECT video_location FROM user_videos WHERE user_id = :user_id"), params={"user_id": user_id})
    video_location = results.scalar()
    if video_location:
        try:
            return StreamingResponse(file_iterator(video_location), media_type="video/mp4")
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="Video not found")
    else:
        raise HTTPException(status_code=404, detail="Video not found")


@app.get("/api/is_token_valid")
async def is_token_valid(token: str, db: db_dependency):
    user = db.query(models.User).filter(models.User.token == token).first()
    if user:
        return {"valid": True}
    else:
        raise HTTPException(status_code=404, detail="Token not found")

@app.post('/api/get_state')
async def get_state(token: str,db: db_dependency):
    user = db.query(models.User).filter(models.User.token == token).first()
    if user.page_state:
        return {"state": "active"}
    elif not user.page_state:
        return {"state": "passive"}
