from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from api.authenticator import authenticator
from api.messages.routers.messages import messages_router
from api.accounts.routers import accounts
from api.peers.routers import peers
from api.matching.routers import matching
from api.tags.routers import tags

from .database import initialize_database

# Initialize environment variables
load_dotenv()

# Initialize the database
initialize_database()

# Import FastAPI app and security scheme
app = FastAPI()

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
app.include_router(messages_router)
app.include_router(accounts.router)
app.include_router(peers.router)
app.include_router(matching.router)
app.include_router(tags.router)


# Root endpoint
@app.get("/")
def root():
    return {"message": "You hit the root path!"}

# Dummy endpoint for launch details
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

# Dummy endpoint to get current user info
@app.get("/users/me")
async def read_users_me():
    return {"user": "dummy user"}
