from pydantic import BaseModel

class Peer(BaseModel):
    user_id: int
    peer_id: int
    peer_name: str
    profile_link: str
    tags_id: int
    profile_image: str
    status: int
