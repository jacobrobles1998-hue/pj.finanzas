from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.account import Account
from app.models.user import User
from app.schemas.account import AccountCreate, AccountOut
from app.core.deps import get_current_user

router = APIRouter(prefix="/accounts", tags=["accounts"])

@router.get("/", response_model=List[AccountOut])
def listar_cuentas(db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    return db.query(Account).filter(Account.user_id == usuario.id).all()

@router.post("/", response_model=AccountOut)
def crear_cuenta(acc: AccountCreate, db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    nueva = Account(user_id=usuario.id, nombre=acc.nombre, tipo=acc.tipo)
    db.add(nueva)
    db.commit()
    db.refresh(nueva)
    return nueva

@router.delete("/{cuenta_id}")
def eliminar_cuenta(cuenta_id: int, db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    acc = db.query(Account).filter(Account.id == cuenta_id, Account.user_id == usuario.id).first()
    if not acc:
        raise HTTPException(status_code=404, detail="Cuenta no encontrada")
    db.delete(acc)
    db.commit()
    return {"detail": "Cuenta eliminada"}