from fastapi import APIRouter, Depends, Response
from typing import List
from api.authenticator import authenticator
from .. queries.messages import MessageQueries
from .. models import MessageOut, MessageIn

messages_router = APIRouter()


@messages_router.get("/api/messages/{user_id}", tags=["Messages"],
                     response_model=List[List[MessageOut]])
def get_messages(
    user_id: int,
    response: Response,
    queries: MessageQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    records = queries.get_messages(user_id)
    if records is None:
        response.status_code = 404
        return []
    return records


@messages_router.post("/api/messages/create", tags=["Messages"],
                      response_model=List[MessageOut])
def create_message(
        message_in: MessageIn,
        response: Response,
        queries: MessageQueries = Depends(),
        account_data: dict = Depends(authenticator.get_current_account_data)
        ):
    message = []
    record = queries.create_message(message_in)
    message.append(record)
    if record is None:
        response.status_code = 404
        return []
    return message


@messages_router.get("/api/messages/{user_id}/message/{user2_id}",
                     tags=["Messages"], response_model=List[MessageOut])
def get_messages_from_one_user(
    user_id: int,
    user2_id: int,
    response: Response,
    queries: MessageQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
        ):
    records = queries.get_messages_from_one_user(user_id, user2_id)
    if records is None or len(records) == 0:
        response.status_code = 404
        return []
    return records
