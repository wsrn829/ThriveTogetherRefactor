from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import httpx
import os
from dotenv import load_dotenv


from api.authenticator import authenticator
from api.messages.routers.messages import messages_router
from api.accounts.routers import accounts
from api.peers.routers import peers
from api.matching.routers import matching
from api.tags.routers import tags


# Initialize environment variables
load_dotenv()


# Import FastAPI app and security scheme
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


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


# # Function to get the current user using JWT token
# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     url = "https://YOUR_DOMAIN/.well-known/jwks.json"
#     jwks = httpx.get(url).json()
#     unverified_header = jwt.get_unverified_header(token)
#     rsa_key = {}
#     for key in jwks["keys"]:
#         if key["kid"] == unverified_header["kid"]:
#             rsa_key = {
#                 "kty": key["kty"],
#                 "kid": key["kid"],
#                 "use": key["use"],
#                 "n": key["n"],
#                 "e": key["e"]
#             }
#     try:
#         payload = jwt.decode(
#             token,
#             rsa_key,
#             algorithms=["RS256"],
#             audience="YOUR_API_AUDIENCE",
#             issuer="https://YOUR_DOMAIN/"
#         )
#     except JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Could not validate credentials",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     return payload


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
async def read_users_me(
    # current_user: dict = Depends(get_current_user)
    ):
    return current_user
