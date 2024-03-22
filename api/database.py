import os
from sqlalchemy import create_engine, Boolean, DateTime, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.pool import QueuePool
from sqlalchemy.ext.declarative import declarative_base


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

    sender_user = relationship('Users', foreign_keys=[sender])
    recipient_user = relationship('Users', foreign_keys=[recipient])
    user = relationship('Users', foreign_keys=[user_id])

class Tags(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True, nullable=False)
    tag = Column(String, nullable=False, unique=True)

    user_tags = relationship('UserTags', back_populates='tag')

class UserTags(Base):
    __tablename__ = 'user_tags'

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    tag_id = Column(Integer, ForeignKey('tags.id'), nullable=False)

    user = relationship('Users', back_populates='user_tags')
    tag = relationship('Tags', back_populates='user_tags')

engine = None
SessionLocal = None

def initialize_database():
    global engine, SessionLocal
    uri = os.getenv("DATABASE_URL")
    if uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)

    engine = create_engine(uri, poolclass=QueuePool, pool_size=10, max_overflow=10)
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def connect_to_db():
    return SessionLocal()

def close_connection(db):
    db.close()

def close_engine():
    engine.dispose()

def get_db():
    db = connect_to_db()
    try:
        yield db
    finally:
        close_connection(db)

def get_database():
    return Base.metadata