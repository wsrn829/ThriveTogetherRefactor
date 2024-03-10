import pytest
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from fastapi.testclient import TestClient
from api.main import app
from api.messages.queries.messages import MessageQueries
from api.authenticator import authenticator


@pytest.fixture
def test_client():
    return TestClient(app)


@pytest.fixture
def message_queries():
    return MessageQueries()


class DummyMessageQueries:
    def create_message(self, data):
        return fake_message


class MessageIn(BaseModel):
    recipient: int
    sender: int
    content: str


class MessageOut(BaseModel):
    id: int
    recipient: int
    sender: int
    content: str
    date: datetime
    is_read: Optional[bool] = False
    username: str
    profile_image: Optional[str]
    profile_link: Optional[str]
    user_id: int


fake_message = {
    "id": 10,
    "recipient": 1,
    "sender": 2,
    "content": "you finally did it!!!",
    "date": "2023-07-20T01:05:46.337467",
    "is_read": False,
    "username": "agifford33",
    "profile_image": "https://img.fixthephoto.com/blog/images/gallery/",
    "profile_link": None,
    "user_id": 1,
}


def fake_get_current_account_data():
    return MessageOut(
        id=0,
        recipient=1,
        sender=2,
        content="hi",
        date="2023-07-20T21:03:33.810572",
        is_read=False,
        username="jeremyia",
        profile_image="string",
        profile_link="string",
        user_id=2,
    )


def test_create_message(test_client):
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    test_client = TestClient(app)
    app.dependency_overrides[MessageQueries] = DummyMessageQueries

    data = {
        "sender": 2,
        "recipient": 1,
        "content": "Test message",
    }

    response = test_client.post("/api/messages/create/", json=data)

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 10,
            "recipient": 1,
            "sender": 2,
            "content": "you finally did it!!!",
            "date": "2023-07-20T01:05:46.337467",
            "is_read": False,
            "username": "agifford33",
            "profile_image":
                "https://img.fixthephoto.com/blog/images/gallery/",
            "profile_link": None,
            "user_id": 1,
        }
    ]
