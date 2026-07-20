from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)

    descripcion = Column(String, nullable=True)
    monto = Column(Float, nullable=False)
    fecha = Column(DateTime(timezone=True), server_default=func.now())

    account = relationship("Account", back_populates="transactions")
    category = relationship("Category", back_populates="transactions")

    