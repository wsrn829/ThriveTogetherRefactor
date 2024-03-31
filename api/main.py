import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

import api.authenticator
from api.messages.routers import messages
from api.accounts.routers import accounts
from api.peers.routers import peers
from api.peer_requests.routers import peer_requests
from api.matching.routers import matching
from api.tags.routers import tags

# Load environment variables from .env file
load_dotenv()

# Import FastAPI app and security scheme
app = FastAPI()

# # Get the CORS host from environment variables with a default value
# cors_host = env_vars.get("CORS_HOST", "https://localhost:3000")

# # Add localhost:3000 to the list of allowed origins
# allow_origins = [cors_host, "https://localhost:3000"]

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://thrivetogether.netlify.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api.authenticator.router)
app.include_router(messages.messages_router)
app.include_router(accounts.router)
app.include_router(peers.router)
app.include_router(peer_requests.router)
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
