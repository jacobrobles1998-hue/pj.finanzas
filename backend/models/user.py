from sqlalchemy import Column, Integer, String, Datetime
from squlalchemy.sql import func
from app.dataase import Base

class user(Base):
    __tablename__ = "users"


    id = Column(integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_passeord = Column(String, nullable=False)
    nombre = Column(String, nullable=False)
    create_at = Column(Datetime(timezone=True), server_default=func.now())
