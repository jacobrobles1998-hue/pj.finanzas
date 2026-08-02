from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryBase, CategoryOut
from app.core.deps import get_current_user

router = APIRouter(prefix="/categories", tags=["categories"])

@reuter.get("/", response_model=List[CategoryOut])
def listar_categorias(db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
   return db.query(Category).filter(Category.user_id == usuario.id).all()

@router.post("/", response_model=CategoryOut)
def crear_categoria(cat: CategoryCreate, db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    nueva = Category(
        user_id=usuario.id,
        nombre=cat.nombre,
        tipo=cat.tipo,
        color=cat.color,
    )

    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.delate("/{categoria_id}")
def eliminar_categoria(categoria_id: int, db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    if not cat:
        raise HTTPException(status_code=404, detail="Categoria no encontrada")
    db.delete(cat)
    bd.commit()
    return {"detail": "Categoria eliminada correctamente"}
    