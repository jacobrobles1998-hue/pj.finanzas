from pydantic import BaseModel

class AccountBase(BaseModel):
    nombre: str
    tipo: str

class AccountOut(AccountBase):
    id: int
    nombre: str
    tipo: str

    class Config:
        from_attributes = True
        
        