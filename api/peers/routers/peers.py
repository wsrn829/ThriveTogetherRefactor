from fastapi import APIRouter, Depends, Response
from typing import List

from ..models import Peer
from ..queries.peers import PeerQueries
from authenticator import authenticator

router = APIRouter()

@router.get("/api/peers/{user_id}", tags=["Peers"], response_model=List[Peer])
def get_peers(
    user_id: int,
    response: Response,
    queries: PeerQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    records = queries.get_peers(user_id)
    if records is None:
        response.status_code = 404
        return []

    peers = []
    for record in records:
        peer = Peer(
            user_id=record.get("user_id"),
            peer_id=record.get("peer_id"),
            peer_name=record.get("peer_name"),
            profile_link=record.get("profile_link"),
            tags_id=record.get("tags_id"),
            profile_image=record.get("profile_image"),
            status=record.get("status"),
        )
        peers.append(peer)
    return peers