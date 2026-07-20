from fastapi import FastAPI
from app.database import Base, engine
from app.models import user, category, account, transaction
from app.routers import auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)

@app.get("/")
def root():
    return {"status": "ok"}