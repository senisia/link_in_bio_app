from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    password: str


class UserPrefBase(BaseModel):
    spotify_link: Optional[str]
    discord_link: Optional[str]
    steam_link: Optional[str]
    color_scheme: Optional[str]
    token: str
