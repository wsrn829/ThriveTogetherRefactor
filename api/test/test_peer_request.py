from fastapi.testclient import TestClient
from api.main import app
from api.peers.routers.peers import PeerConnectionQueries
from api.authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class AccountOut(BaseModel):
    id: int
    username: str
    name: str
    age: int
    gender: str
    pronouns: str
    email: str
    profile_image: str | None
    banner_image: str | None
    about_me: str | None
    my_story: str | None
    preferences: str | None


def fake_get_current_account_data():
    return AccountOut(
        id=0,
        username="string",
        name="string",
        age=0,
        gender="string",
        pronouns="string",
        email="string",
        profile_image="string",
        banner_image="string",
        about_me="string",
        my_story="string",
        preferences="string",
        )


class PeerQueries:
    def get_peer_connection(self, user_id: int):
        return [
                    {
                        "sender": 0,
                        "recipient": 0,
                        "status": "string",
                        "has_messaged": "string",
                        "sender_name": "string",
                        "recipient_name": "string"
                    }
                ]


def test_get_peer_connection():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[PeerConnectionQueries] = PeerQueries
    response = client.get("/api/peer_connections/1/")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == {
                "peerConnections": [
                    {
                        "sender": 0,
                        "recipient": 0,
                        "status": "string",
                        "has_messaged": "string",
                        "sender_name": "string",
                        "recipient_name": "string"
                    }
                ]
    }
