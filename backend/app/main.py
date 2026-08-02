from fastapi import FastAPI
from app.database import Base, engine
from app.models import user, category, account, transactions
from app.routers import auth, accounts, categories, transactions
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(categories.router)
app.include_router(accounts.reuter)
app.include_router(transactions.router)


@app.get("/")
def root():
    return {"status": "ok"}