from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserOut, Token
from app.core.security import hashear_password, verificar_password, crear_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existente = db.query(User). filter(User.emaiil == user.email).first()
    if existente:
        raise HTTPException(status_code=400, detail="El correo ya esta registrado")

    nuevo_usuario = User(
        email= user.email,
        nombre= user.nombre,
        hashear_password= hashear_password(user.password)

    )

    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario

    @router.post("/login", reponde_model=Token)
    def ogin(crdenciales: UserLogin, db: Session = Depends(get_db)):
        usuario = db.query(User).filter(User.email == credenciales.email).first()
        if not usuario or not verificar_password(crdenciales.password, usuario.hashear_password):
            raise HHTPException(status_code=401, detail="correo o conraseña incorrecto")

        token = crear_access_token({"sub": str(usuario.id)})
        return {"access_token": token, "token_type": "bearer"}
            

        


