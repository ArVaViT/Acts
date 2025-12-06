from pydantic import BaseModel, EmailStr
from datetime import datetime
from app.models.user import UserRole


class UserBase(BaseModel):
    email: EmailStr
    full_name: str | None = None


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: str
    role: UserRole
    created_at: datetime
    updated_at: datetime | None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None

