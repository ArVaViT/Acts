"""Генерация bcrypt хеша для тестового пароля"""
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

password = "testpass123"
hashed = pwd_context.hash(password)

print(f"Пароль: {password}")
print(f"Хеш: {hashed}")
