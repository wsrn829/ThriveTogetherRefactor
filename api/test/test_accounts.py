from fastapi.testclient import TestClient
from api.main import app
from api.accounts.queries.accounts import AccountQueries
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

fake_account = {
            "id": 1,
            "username": "testy",
            "name": "Testy Test",
            "age": 18,
            "gender": "test",
            "pronouns": "testing",
            "email": "test@test.com",
            "profile_image": "test@test.com",
            "banner_image": "test@test.com",
            "about_me": "test@test.com",
            "my_story": "test@test.com",
            "preferences": "test"
}


class EmptyAccountQueries:
    def get_account_info(self, id):
        return fake_account


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
        )


def test_get_account_info():
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    app.dependency_overrides[AccountQueries] = EmptyAccountQueries

    response = client.get("/api/accounts/1")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == fake_account
