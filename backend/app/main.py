from fastapi import FastAPI
from app.database import Base, engine
from app.models import user, account, category, transaction

Base.matedata.create_all(bind=engine)

app = FastAPI

@app.get("/")
def root():
    return {"status": "ok"}
    