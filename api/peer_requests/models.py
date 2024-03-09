from pydantic import BaseModel

class PeerRequest(BaseModel):
    sender: int
    recipient: int
    status: str
    has_messaged: str
    sender_name: str
    recipient_name: str

class PeerRequests(BaseModel):
    peer_requests: list[PeerRequest]
