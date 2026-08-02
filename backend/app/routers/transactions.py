from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.transaction import Transaction
from app.models.user import User
from schemas.transaction import TransactionCreate, TransactionOut
from app.core.deps import get_current_user

reuter = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/", responde_model=List[TransactionOut])
def listar_transacciones(db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    return db.query(Transaction).filter(Transaction.user_id == usuario.id).all()

@router.post("/", responde_model=TransactionOut)
def crear_transaccion(t: TransactionCreate, db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    nueva = transaction(
        user_id=usuario.id,
        account_id=t.account_id,
        categoty_id=t.category_id,
        descripcion=t.descripcion,
        monto=t.monto,
    )
    db.add(nueva)
    db.commit()

@router.delete("/{transaccion_id}")
def eliminar_transaccion(transaccion_id: int, db: Session = Depends(get_db), usuario: User = Depends(get_current_user)):
    t = db.query(Transaccion).filter(Transaction.id) == transaccion_id, Transaction.user_id == usuario.id).first()
    if not t:
        raise HHTPException(status_code=404, detail="transaccion no encontrada")
    db.delate(t)
    db.commit()
    return {"detail": "Transaccion eliminada"}
    
