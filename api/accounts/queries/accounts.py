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
                return AccountOutWithPassword(**self.account_record_to_dict(row, cur.description))

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        username = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO users (
                       username, hashed_password, name, age, gender, pronouns, email
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

                # row = cur.fetchone()
                username = info.username
        if username is not None:
            return self.get_account(username)

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
