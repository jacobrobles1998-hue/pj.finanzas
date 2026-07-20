from sqlalchemy  import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class account(Base):
    __tablename__="accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    nombre= Column(String, nullable=False)
    tipo = Column(String, nullable=False)

    transaction = relationship("transaction", back_populates="account")
