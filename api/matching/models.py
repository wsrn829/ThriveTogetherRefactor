from pydantic import BaseModel
from typing import List, Optional


class HttpError(BaseModel):
    detail: str


class TagsOut(BaseModel):
    tags: list[str]


class MatchOut(BaseModel):
    username: str
    id: int
    tags: List[str]
    about_me: Optional[str]
    profile_link: Optional[str]
    profile_image: Optional[str]
    gender: str
    pronouns: str


class MatchesOut(BaseModel):
    matches: list[MatchOut]
