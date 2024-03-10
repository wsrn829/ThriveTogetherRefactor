from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.authenticator import authenticator
from api.messages.routers.messages import messages_router
from api.accounts.routers import accounts
from api.peers.routers import peers
from api.matching.routers import matching
from api.tags.routers import tags
import os

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(messages_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(peers.router)
app.include_router(matching.router)
app.include_router(tags.router)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
