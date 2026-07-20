from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    nombre = Column(String, nullable=False)
    tipo = Column(String, nullable=False)
    color = Column(String, nullable=True)

    transactions = relationship("Transaction", back_populates="category")
    