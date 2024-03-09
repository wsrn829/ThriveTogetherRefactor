import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class PeerRequestQueries:
    def _row_to_dict(self, cur, row):
        return {column.name: value for value, column in zip(row, cur.description)}

    def create_peer_request(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = {
                    "sender": data.sender,
                    "recipient": data.recipient,
                    "status": data.status,
                    "has_messaged": data.has_messaged,
                    "sender_name": data.sender_name,
                    "recipient_name": data.recipient_name,
                }
                cur.execute(
                    """
                    INSERT INTO peer_requests (sender, recipient, status, has_messaged, sender_name, recipient_name)
                    VALUES (%(sender)s, %(recipient)s, %(status)s, %(has_messaged)s, %(sender_name)s, %(recipient_name)s)
                    RETURNING id, sender, recipient, status, has_messaged, sender_name, recipient_name
                    """,
                    params,
                )

                row = cur.fetchone()
                return self._row_to_dict(cur, row) if row else None

    def get_peer_requests(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT sender, recipient, has_messaged, sender_name, recipient_name, status
                    FROM peer_requests as p
                    WHERE (p.recipient = %s)
                    """,
                    {"user_id": user_id},
                )
                return [self._row_to_dict(cur, row) for row in cur.fetchall()]

    def get_peer_request(self, user_id, request_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT sender, recipient, has_messaged, sender_name, recipient_name, status
                    FROM peer_requests as p
                    WHERE (p.sender = %(request_id)s and p.recipient= %(user_id)s)
                    """,
                    {"request_id": request_id, "user_id": user_id},
                )
                return [self._row_to_dict(cur, row) for row in cur.fetchall()]

    def update_peer_request(self, status, user_id, request_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE peer_requests
                    SET status = %(status)s
                    WHERE (sender = %(request_id)s and recipient= %(user_id)s)
                    RETURNING sender, recipient, status, has_messaged, sender_name, recipient_name
                    """,
                    {"status": status, "request_id": request_id, "user_id": user_id},
                )
                return [self._row_to_dict(cur, row) for row in cur.fetchall()]