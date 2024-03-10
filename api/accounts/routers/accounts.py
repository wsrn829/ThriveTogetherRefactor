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


@router.post("/api/accounts",
             tags=["Accounts"],
             response_model=AccountToken | HttpError
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
    account_id: int,
    accounts: AccountQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
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
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    account = accounts.get_account_info(account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account not found",
        )
    updated_account = accounts.update(account_id, info)
    return updated_account


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
