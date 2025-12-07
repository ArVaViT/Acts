# Точка входа для Vercel
# Vercel ищет app в index.py, main.py или app.py
from app.main import app

# Экспортируем app для Vercel
__all__ = ["app"]
