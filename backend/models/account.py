from sqlalchemy import Column, Integer, String, Foreignkey
from sqlalchemy.orm import relationship
from app.database import Base

class Account(Base):
    __tablename__ = "Accounts"

    id = Column(Integer, primary_key=True, index=True)
    user id = Column(Integer, Foreignkey("users.id"), nullable=False)
    nombre = Column(string, nullable=False)
    tipo = Column(String, nullable=False)

    transaction = relationship("transaction", back_populates="account")
    