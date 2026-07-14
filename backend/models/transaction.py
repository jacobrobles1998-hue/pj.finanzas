from sqlalchemy import Column, Integer, String, Foreignkey, Datetime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

Class transaction(Base):
    __tablename__ = "transaction"

    id = Column(Integer, primary_key=True, index=True)
    user.id = column(Integer, Foreignkey("user.id"), nullable=False)
    account_id = Column(Integer, Foreignkey("accounts.id"), nullable=False)
    category_id = Column(Integer, Foreignkey("categories.id"), nullable=False)


descripcion = Column(String, nullable=False)
monto = Column(Float, nullable=False)
fecha = Column(Datetime(timezone=True), server_default=func.now())

account = relationship("account", back_populates="transactions")
category = relationship("category", back_populates="transactions") 


