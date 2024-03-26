from fastapi import Depends, Response, APIRouter
from ..models import MatchesOut, HttpError
from ..queries.matching import MatchQueries
from api.authenticator import authenticator
from typing import Union


router = APIRouter()


# @router.get("/api/tags", tags=["Tags"], response_model=TagsOut | HttpError)
# async def get_user_tags(
#     username: str,
#     response: Response,
#     queries: TagQueries = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
# ):
#     record = queries.get_user_tags(username)
#     if record is None:
#         response.status_code = 404
#     else:
#         return record


@router.get("/api/matches/{tag}",
            tags=["Matches"],
            response_model=Union[MatchesOut, HttpError]
            )
async def get_matches(
    tag: str,
    response: Response,
    queries: MatchQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_matches(tag)
    if len(record) == 0:
        response.status_code = 404
        return {"detail": "No users found with this tag!"}
    else:
        return record
