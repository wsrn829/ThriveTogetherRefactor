import os
from dotenv import load_dotenv
import psycopg2

# Load environment variables from .env file
load_dotenv()

# Fetch the DATABASE_URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

def execute_sql(sql_statements):
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    try:
        for sql in sql_statements:
            cur.execute(sql)
        conn.commit()
    finally:
        cur.close()
        conn.close()

steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            hashed_password VARCHAR(1000) NOT NULL,
            name VARCHAR(100) NOT NULL,
            age INT NOT NULL,
            gender VARCHAR(50) NOT NULL,
            pronouns VARCHAR(10) NOT NULL,
            profile_link VARCHAR(75),
            profile_image VARCHAR(1000),
            banner_image VARCHAR(1000),
            email VARCHAR(150) NOT NULL,
            about_me VARCHAR(5000),
            my_story VARCHAR(5000)
        );
        """,
        """
        DROP TABLE IF EXISTS users;
        """
    ],
    [
        """
        CREATE TABLE tags (
            id SERIAL PRIMARY KEY NOT NULL,
            tag VARCHAR(50) NOT NULL UNIQUE
        );
        """,
        """
        DROP TABLE IF EXISTS tags;
        """
    ],
    [
        """
        CREATE TABLE user_tags (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL REFERENCES users(id),
            tag_id INT NOT NULL REFERENCES tags(id)
        );
        """,
        """
        DROP TABLE IF EXISTS user_tags;
        """
    ],
    [
        """
        CREATE TABLE messages (
            id SERIAL PRIMARY KEY NOT NULL,
            recipient INT NOT NULL REFERENCES users(id),
            sender INT NOT NULL REFERENCES users(id),
            date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            content VARCHAR(5000),
            is_read BOOL,
            user_id INT,
            FOREIGN KEY (recipient) REFERENCES users(id),
            FOREIGN KEY (sender) REFERENCES users(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """,
        """
        DROP TABLE IF EXISTS messages;
        """
    ],
    [
        """
        CREATE TABLE peers (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL,
            peer_id INT NOT NULL,
            peer_name VARCHAR(50) NOT NULL,
            profile_link VARCHAR(1000),
            tags_id INT,
            profile_image VARCHAR(1000),
            status INT NOT NULL DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (peer_id) REFERENCES users(id)
        );
        """,
        """
        DROP TABLE IF EXISTS peers;
        """
    ],
    [
        """
        CREATE TABLE peer_requests (
            id SERIAL PRIMARY KEY NOT NULL,
            sender INT NOT NULL REFERENCES users(id),
            recipient INT NOT NULL REFERENCES users(id),
            status VARCHAR(50) NOT NULL,
            has_messaged BOOL,
            sender_name VARCHAR(50) NOT NULL,
            recipient_name VARCHAR(50) NOT NULL,
            FOREIGN KEY (sender) REFERENCES users(id),
            FOREIGN KEY (recipient) REFERENCES users(id)
        );
        """,
        """
        DROP TABLE IF EXISTS peer_requests;
        """
    ],
]

def migrate():
    for step in steps:
        execute_sql(step)

if __name__ == "__main__":
    migrate()
