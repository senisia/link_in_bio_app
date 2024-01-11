from sqlalchemy import Boolean, Column, String, Integer, null
from database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(1000), nullable=False)
    spotify_link = Column(String(200), nullable=True)
    discord_link = Column(String(200), nullable=True)
    steam_link = Column(String(200), nullable=True)
    color_scheme = Column(String(200), nullable=True)
    token = Column(String, unique=True, index=True, nullable=False)
    admin = Column(Boolean, default=False)
    page_state = Column(Boolean, default=False)

    def __init__(self, username, password, spotify_link, discord_link, steam_link, color_scheme, token, admin) -> None:
        self.username = username
        self.password = password
        self.spotify_link = spotify_link
        self.discord_link = discord_link
        self.steam_link = steam_link
        self.color_scheme = color_scheme
        self.token = token
        self.admin = admin
