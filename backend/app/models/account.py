from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    # ... tus otros campos ...

    # CORRECCIÓN AQUÍ: El primer argumento debe ser el nombre de la clase ("Transaction")
    transactions = relationship("Transaction", back_populates="account")