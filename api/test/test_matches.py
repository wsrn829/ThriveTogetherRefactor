from fastapi.testclient import TestClient
from api.main import app
from api.matching.queries.matching import MatchQueries
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


fake_match = {
                "username": "mmorales",
                "id": 36,
                "tags": [
                    "ADHD",
                    "Anxiety"
                ],
                "about_me": "string",
                "profile_link": "string",
                "profile_image": "string",
                "gender": "Male",
                "pronouns": "he/him"
            }


class FakeMatchQueries:
    def get_matches(self, tag):
        if tag in fake_match["tags"]:
            return {"matches": [fake_match]}
        else:
            return {"matches": []}


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


def test_get_matches():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[MatchQueries] = FakeMatchQueries

    response = client.get("/api/matches/ADHD")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"matches": [fake_match]}


def test_no_matches():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    app.dependency_overrides[MatchQueries] = FakeMatchQueries

    response = client.get("/api/matches/null")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {"matches": []}
