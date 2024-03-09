from fastapi import APIRouter, Depends, Response
from typing import List

from ..models import PeerRequest, PeerRequests
from ..queries.peer_requests import PeerRequestQueries
from authenticator import authenticator

router = APIRouter()

@router.post(
    "/api/requests/create",
    tags=["Peers"],
    response_model=PeerRequest,
)
def create_peer_request(
    peer_request: PeerRequest,
    response: Response,
    queries: PeerRequestQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    record = queries.create_request(peer_request)
    if record is None:
        response.status_code = 404
        return []

    peer_request = PeerRequest(
        sender=record["sender"],
        recipient=record["recipient"],
        status=record["status"],
        has_messaged=record["has_messaged"],
        sender_name=record["sender_name"],
        recipient_name=record["recipient_name"],
    )
    return peer_request

@router.get(
    "/api/requests/{user_id}",
    tags=["Peers"],
    response_model=PeerRequests,
)
async def get_peer_request(
    user_id: int,
    response: Response,
    queries: PeerRequestQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    result = {}
    record = queries.get_peer_request(user_id)
    if record is None:
        response.status_code = 404
        return []
    result["peer_request"] = record
    return result

@router.put(
    "/api/requests/update/{user_id}/{sendRequest_id}/{status}",
    tags=["Peers"],
    response_model=PeerRequest,
)
async def update_peer_request(
    user_id: int,
    sendRequest_id: int,
    status: str,
    response: Response,
    queries: PeerRequestQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    records = queries.update_peer_requests(status, user_id, sendRequest_id)
    return records