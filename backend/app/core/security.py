from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "cambia-esto-por-una-clave-larga-y-aleatoria"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 dias

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verificar_password(password_plano: str, password_hash: str) -> bool:
    return pwd_context.verify(password_plano, password_hash)

def hashear_password(password: str) -> str:
    return pwd_context.hash(password)

def crear_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None