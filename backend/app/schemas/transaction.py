from pydantic import BaseModel
from datetime import datetime

class TransactionCreate(BaseModel):
    account_id: int
    category: int
    descripcion: str | None = None
    monto: float

class TransactionOut(BaseModel):
    id: int
    account_id: int
    categoria_id: int
    descripcion: str | None = None
    monto: float
    fecha: datetime

    class Config
        from_attributes = True

        