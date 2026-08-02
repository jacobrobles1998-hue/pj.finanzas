from pydantic import BaseModel

class CategoryBase(BaseModel):
    nombre: str
    tipo: str
    color: str | None = None

class CategoriaOut(BaseModel):
    id: int
    nombre: str
    tipo: str
    color: str | None = None

    class Config:
        from_attributes = True

