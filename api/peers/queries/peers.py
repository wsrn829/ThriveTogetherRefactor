import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class PeerQueries:
    def _row_to_dict(self, cur, row):
        return {column.name: value for value, column in zip(row, cur.description)}

    def create_peer(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = {
                    "user_id": data.user_id,
                    "peer_id": data.peer_id,
                    "peer_name": data.peer_name,
                    "profile_link": data.profile_link,
                    "tags_id": data.tags_id,
                    "profile_image": data.profile_image,
                    "status": data.status,
                }
                cur.execute(
                    """
                    INSERT INTO peers (user_id, peer_id, peer_name, profile_link, tags_id, profile_image, status)
                    VALUES (%(user_id)s, %(peer_id)s, %(peer_name)s, %(profile_link)s, %(tags_id)s, %(profile_image)s, %(status)s)
                    RETURNING user_id, peer_id, peer_name, profile_link, tags_id, profile_image, status
                    """,
                    params,
                )

                row = cur.fetchone()
                return self._row_to_dict(cur, row) if row else None

    def get_peers(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT user_id, peer_id, peer_name, profile_link, tags_id, profile_image, status
                    FROM peers as p
                    WHERE (p.user_id= %(user_id)s)
                    """,
                    {"user_id": user_id},
                )
                return [self._row_to_dict(cur, row) for row in cur.fetchall()]