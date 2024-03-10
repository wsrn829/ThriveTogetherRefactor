from fastapi.testclient import TestClient
from api.main import app
from api.peers.queries.peers import PeerQueries
from pydantic import BaseModel
from api.authenticator import authenticator


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


class DummyPeerQueries:
    def get_peers(self, user_id: int):
        return [
            {
                "user_id": 1,
                "peer_id": 2,
                "peer_name": "Barbie",
                "profile_link": "string",
                "tags_id": 1,
                "profile_image": "string",
                "status": 0,
            }
        ]


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


def test_get_peers():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    app.dependency_overrides[PeerQueries] = DummyPeerQueries
    response = client.get("/api/peers/1")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [
        {
            "user_id": 1,
            "peer_id": 2,
            "peer_name": "Barbie",
            "profile_link": "string",
            "tags_id": 1,
            "profile_image": "string",
            "status": 0,
        }
    ]
