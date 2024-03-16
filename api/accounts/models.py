from typing import Optional

from pydantic import BaseModel


class AccountIn(BaseModel):
    username: str
    password: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str


class AccountOut(BaseModel):
    id: int
    username: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str
    profile_image: Optional[str]
    banner_image: Optional[str]
    about_me: Optional[str]
    my_story: Optional[str]
    preferences: Optional[str]


class AccountOutWithPassword(AccountOut):
    hashed_password: str
