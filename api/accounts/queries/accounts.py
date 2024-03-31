import os
from ..models import AccountIn, AccountOut, AccountOutWithPassword
from psycopg_pool import ConnectionPool


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class DuplicateAccountError(ValueError):
    pass


class AccountQueries:
    def get_account(self, username: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE users.username = %s
                    """,
                    [username],
                )

                row = cur.fetchone()
                return AccountOutWithPassword(
                    **self.updated_account_record_to_dict(row, cur.description)
                    )

    def get_account_info(self, id: int) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                    id,
                    username,
                    name, age,
                    gender,
                    pronouns,
                    email,
                    profile_image,
                    banner_image,
                    about_me,
                    my_story
                    FROM users
                    WHERE users.id = %s
                    """,
                    [id]
                )

                row = cur.fetchone()
                return self.updated_account_record_to_dict(
                    row,
                    cur.description
                    )

    def create(
            self,
            info: AccountIn,
            hashed_password: str
            ) -> AccountOutWithPassword:
        username = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users (
                       username,
                       hashed_password,
                       name,
                       age,
                       gender,
                       pronouns,
                       email
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        info.username,
                        hashed_password,
                        info.name,
                        info.age,
                        info.gender,
                        info.pronouns,
                        info.email,

                    ],
                )

                if cur.rowcount == 0:
                    raise Exception("Failed to create user")

        return self.get_account(info.username)

    def update(self, id: int, info: AccountOut) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE users
                    SET
                        username = %s,
                        name = %s,
                        age = %s,
                        gender = %s,
                        pronouns = %s,
                        email = %s,
                        profile_image = %s,
                        banner_image = %s,
                        about_me = %s,
                        my_story = %s,
                        preferences = %s
                    WHERE id = %s
                    RETURNING *
                    """,
                    [
                        info.username,
                        info.name,
                        info.age,
                        info.gender,
                        info.pronouns,
                        info.email,
                        info.profile_image,
                        info.banner_image,
                        info.about_me,
                        info.my_story,
                        id,
                    ],
                )

                row = cur.fetchone()
                return self.updated_account_record_to_dict(
                    row, cur.description
                    )

    def account_record_to_dict(self, row, description):
        account = None
        if row is not None:
            account = {}
            account_fields = [
                "pronouns",
                "email",
                "id",
                "username",
                "name",
                "age",
                "gender",
                "hashed_password",
            ]
            for i, column in enumerate(description):
                if column.name in account_fields:
                    account[column.name] = row[i]
        return account

    def updated_account_record_to_dict(self, row, description):
        account = None
        if row is not None:
            account = {}
            account_fields = [
                "pronouns",
                "email",
                "id",
                "username",
                "name",
                "age",
                "gender",
                "hashed_password",
                "profile_image",
                "banner_image",
                "about_me",
                "my_story",
                "preferences",
            ]
            for i, column in enumerate(description):
                if column.name in account_fields:
                    account[column.name] = row[i]
        return account
