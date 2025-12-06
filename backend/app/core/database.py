from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Parse DATABASE_URL and configure for Supabase
# IMPORTANT: For Vercel/serverless, use Connection Pooling endpoint from Supabase
# Get it from: Supabase Dashboard -> Project Settings -> Database -> Connection Pooling
# Use "Transaction" mode connection string
db_url = settings.DATABASE_URL

# Ensure sslmode is set for Supabase
if "sslmode" not in db_url:
    separator = "&" if "?" in db_url else "?"
    db_url = f"{db_url}{separator}sslmode=require"

# Configure engine for serverless (Vercel) environment
# For serverless, use small pool size and connection recycling
engine = create_engine(
    db_url,
    pool_pre_ping=True,  # Verify connections before using
    pool_size=1,  # Small pool for serverless
    max_overflow=0,  # Don't create additional connections
    pool_recycle=300,  # Recycle connections after 5 minutes
    connect_args={
        "connect_timeout": 10,  # 10 second timeout
        "options": "-c statement_timeout=30000"  # 30 second statement timeout
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
