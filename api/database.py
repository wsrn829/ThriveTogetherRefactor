from sqlalchemy import Boolean, DateTime, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
import os

from dotenv import load_dotenv

load_dotenv()

# Now you can access the environment variable as before
database_url = os.environ["DATABASE_URL"]

# database_url = os.getenv('DATABASE_URL')

engine = create_engine(
    os.environ["DATABASE_URL"],
    poolclass=QueuePool,
    pool_size=19,  # Maximum number of connections
)

Session = sessionmaker(bind=engine)


Base = declarative_base()


class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String(1000), nullable=False)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(50), nullable=False)
    pronouns = Column(String(10), nullable=False)
    profile_link = Column(String(75))
    profile_image = Column(String(1000))
    banner_image = Column(String(1000))
    email = Column(String(150), nullable=False)
    about_me = Column(String(5000))
    my_story = Column(String(5000))

    # Relationship to Peers
    peers = relationship("Peers", back_populates="user")
    user_tags = relationship('UserTags', back_populates='user')


class Peers(Base):
    __tablename__ = 'peers'

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    peer_id = Column(Integer, nullable=False)
    peer_name = Column(String, nullable=False)
    profile_link = Column(String)
    tags_id = Column(Integer)
    profile_image = Column(String)
    status = Column(Integer, nullable=False)

    # Relationship to Users
    user = relationship("Users", back_populates="peers")


class PeerRequests(Base):
    __tablename__ = 'peer_requests'

    id = Column(Integer, primary_key=True, nullable=False)
    sender = Column(Integer, ForeignKey('users.id'), nullable=False)
    recipient = Column(Integer, ForeignKey('users.id'), nullable=False)
    status = Column(String, nullable=False)
    has_messaged = Column(Boolean)
    sender_name = Column(String, nullable=False)
    recipient_name = Column(String, nullable=False)

    # Relationships
    sender_user = relationship('Users', foreign_keys=[sender])
    recipient_user = relationship('Users', foreign_keys=[recipient])


class Messages(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, nullable=False)
    recipient = Column(Integer, ForeignKey('users.id'), nullable=False)
    sender = Column(Integer, ForeignKey('users.id'), nullable=False)
    date = Column(DateTime, nullable=False)
    content = Column(String, nullable=False)
    is_read = Column(Boolean)
    user_id = Column(Integer)

    # Relationships
    sender_user = relationship('Users', foreign_keys=[sender])
    recipient_user = relationship('Users', foreign_keys=[recipient])
    user = relationship('Users', foreign_keys=[user_id])


class Tags(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True, nullable=False)
    tag = Column(String, nullable=False, unique=True)

    # Relationships
    user_tags = relationship('UserTags', back_populates='tag')



class UserTags(Base):
    __tablename__ = 'user_tags'

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    tag_id = Column(Integer, ForeignKey('tags.id'), nullable=False)

    # Relationships
    user = relationship('Users', back_populates='user_tags')
    tag = relationship('Tags', back_populates='user_tags')


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def connect_to_db():
    return SessionLocal()


def close_connection(db):
    db.close()


def close_engine():
    engine.dispose()


def initialize_database():
    Base.metadata.create_all(bind=engine)