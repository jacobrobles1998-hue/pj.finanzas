from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    nombre: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    nombre: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str