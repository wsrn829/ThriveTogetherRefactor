from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine('postgresql://user:password@localhost/dbname')
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


class Peer(Base):
    __tablename__ = 'peers'

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, nullable=False)
    peer_id = Column(Integer, nullable=False)
    peer_name = Column(String, nullable=False)
    profile_link = Column(String)
    tags_id = Column(Integer)
    profile_image = Column(String)
    status = Column(Integer, nullable=False)


class PeerConnections(Base):
    __tablename__ = 'peer_connections'

    id = Column(Integer, primary_key=True, nullable=False)
    sender = Column(Integer, nullable=False)
    recipient = Column(Integer, nullable=False)
    status = Column(String, nullable=False)
    has_messaged = Column(Boolean)
    sender_name = Column(String, nullable=False)
    recipient_name = Column(String, nullable=False)


class Messages(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, nullable=False)
    recipient = Column(Integer, nullable=False)
    sender = Column(Integer, nullable=False)
    date = Column(DateTime, nullable=False)
    content = Column(String)
    is_read = Column(Boolean)
    user_id = Column(Integer)


class Tags(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True, nullable=False)
    tag = Column(String, nullable=False, unique=True)


class UserTags(Base):
    __tablename__ = 'user_tags'

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, nullable=False)
    tag_id = Column(Integer, nullable=False)

Base.metadata.create_all(engine)