from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

SQLALCHEMY_DATABASE_URL = "sqlite:///./app/db/finanzas.db"

engine  = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": false}

)
SessionLocal = sessionmaker(autocommit=false, autoflush=false, bind=engine)
Base = declarative_base()

def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
        