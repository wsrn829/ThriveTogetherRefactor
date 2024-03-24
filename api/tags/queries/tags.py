import os
from typing import Union
from ..models import TagsOut, AllTagsOut, HttpError, SuccessMessage
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class TagQueries:
    def get_all_tags(self) -> AllTagsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, tag FROM tags
                    """
                )
                tags = []
                rows = cur.fetchall()
                for row in rows:
                    tag = {row[0]: row[1]}
                    tags.append(tag)
                return {"tags": tags}

    def get_user_tags(self, username) -> TagsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT tags.tag, tags.id FROM users
                    JOIN user_tags ON (users.id = user_tags.user_id)
                    JOIN tags ON (user_tags.tag_id = tags.id)
                    WHERE (users.username = %s)
                    """,
                    [username],
                )
                tags = []
                rows = cur.fetchall()
                for row in rows:
                    tag = {row[1]: row[0]}
                    tags.append(tag)
                return {"tags": tags}

    def add_user_tag(self, user_id, tag_id) -> Union[HttpError, SuccessMessage]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT COUNT(id) FROM user_tags
                    WHERE user_id = %s AND tag_id = %s
                    """,
                    [user_id, tag_id],
                )
                if cur.fetchone()[0] > 0:
                    return {"detail": "User is already assigned this tag!"}
                else:
                    cur.execute(
                        """
                        INSERT INTO user_tags (user_id, tag_id) VALUES (%s, %s)
                        """,
                        [user_id, tag_id],
                    )

                    return {"success": "Tag successfully added!"}

    def delete_user_tag(self, user_id, tag_id) -> Union[HttpError, SuccessMessage]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM user_tags
                    WHERE user_id = %s AND tag_id = %s
                    """,
                    [user_id, tag_id],
                )
                return {"success": "Tag successfully deleted!"}

    def create_tag(self, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.tag,
                ]
                cur.execute(
                    """
                    INSERT INTO tags (tag)
                    VALUES (%s)
                    RETURNING id, tag
                    """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record
