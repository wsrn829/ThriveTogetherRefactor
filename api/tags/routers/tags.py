from fastapi import Depends, Response, APIRouter
from typing import Union
from ..models import Tag, TagsOut, HttpError, AllTagsOut, SuccessMessage
from ..queries.tags import TagQueries
from api.authenticator import authenticator

router = APIRouter()


@router.get(
    "/api/tags",
    tags=["Tags"],
    response_model=Union[AllTagsOut, HttpError],
)
async def get_all_tags(
    response: Response,
    queries: TagQueries = Depends(),
):
    record = queries.get_all_tags()
    if record is None:
        response.status_code = 404
        return {"detail": "Invalid request."}
    else:
        return record


@router.get(
    "/api/tags/{username}",
    tags=["Tags"],
    response_model=Union[TagsOut, HttpError],
)
async def get_user_tags(
    username: str,
    response: Response,
    queries: TagQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.get_user_tags(username)
    if record is None:
        response.status_code = 404
        return {"detail": "Invalid request."}
    else:
        return record


@router.post(
    "/api/tags/{tag_id}",
    tags=["Tags"],
    response_model=Union[HttpError, SuccessMessage],
)
async def add_user_tag(
    tag_id: int,
    response: Response,
    queries: TagQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["id"]
    try:
        record = queries.add_user_tag(user_id, tag_id)
        if "detail" in record:
            response.status_code = 500
        return record
    except BaseException:
        response.status_code = 500
        return {"detail": "That tag does not exist."}


@router.delete(
    "/api/tags/{tag_id}",
    tags=["Tags"],
    response_model=Union[HttpError, SuccessMessage],
)
async def delete_user_tag(
    tag_id: int,
    response: Response,
    queries: TagQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["id"]
    try:
        record = queries.delete_user_tag(user_id, tag_id)
        return record
    except BaseException:
        response.status_code = 500
        return {"detail": "Unable to delete tag. Are you sure it exists?"}


@router.post("/tags/create", tags=["Tags"], response_model=Tag)
def create_tag(
    tag: Tag,
    response: Response,
    queries: TagQueries = Depends(),
):
    records = queries.create_tag(tag)
    return records
