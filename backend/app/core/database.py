from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# URL-encode password for connection string (handles special characters)
# Parse DATABASE_URL and ensure sslmode=require for Supabase
db_url = settings.DATABASE_URL
if "sslmode" not in db_url:
    separator = "&" if "?" in db_url else "?"
    db_url = f"{db_url}{separator}sslmode=require"

engine = create_engine(db_url, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

