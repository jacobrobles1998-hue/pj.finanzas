from sqlalchemy import column, Integer, String, Foreignkey
from sqlalchemy.orm import relationship
from app.database import Base

Class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    user.id = Column(Integer, Foreignkey("users.id"), nullable=False)
    nombre = Column(String, nullable=False)
    tipo = Column(String, nullable=False)
    color = Column(String, nullable=False)

    transaction = relationship("transaction", back_popolates="category")
    