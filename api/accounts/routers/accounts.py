import os
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from api.authenticator import authenticator
from jose import jwt
from fastapi.security import OAuth2PasswordBearer
from typing import Optional, Union
from pydantic import BaseModel

from ..queries.accounts import (
    AccountIn,
    AccountOut,
    AccountQueries,
    DuplicateAccountError,
)

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: AccountOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_account_data(token: str = Depends(oauth2_scheme)) -> Optional[dict]:
    JWT_SECRET = os.getenv("SIGNING_KEY")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")

    print(f"Token: {token}")  # Print the token


    try:
        # Decode the token
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.JWTError as e:
        print(f"JWTError: {e}")  # Print any errors during decoding
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    return payload

@router.post("/api/accounts",
             tags=["Accounts"],
             response_model=Union[AccountToken, HttpError]
             )
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())

@router.get("/api/accounts/{account_id}",
            tags=["Accounts"],
            response_model=AccountOut
            )
async def get_account_info(
    request: Request,
    account_id: int,
    accounts: AccountQueries = Depends(),
    account_data: dict = Depends(get_current_account_data),  # Use the new function here
):
    # Log the Authorization header
    print(request.headers.get('Authorization'))
    print(account_data)
    account = accounts.get_account_info(account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account not found",
        )
    return account

@router.put("/api/accounts/{account_id}",
            tags=["Accounts"],
            response_model=AccountOut
            )
async def update_account_info(
    account_id: int,
    info: AccountOut,
    accounts: AccountQueries = Depends(),
    account_data: dict = Depends(get_current_account_data),  # Use the new function here
):
    account = accounts.get_account_info(account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account not found",
        )
    updated_account = accounts.update(account_id, info)
    return updated_account

@router.get("/token", response_model=Union[AccountToken, None])
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> Union[AccountToken, None]:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }