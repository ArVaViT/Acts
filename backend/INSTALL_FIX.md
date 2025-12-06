# Решение проблемы с psycopg2-binary на Windows

## Проблема
`psycopg2-binary` не устанавливается из-за отсутствия `pg_config` на Windows.

## Решение 1: Установить PostgreSQL (рекомендуется)

1. Скачайте PostgreSQL: https://www.postgresql.org/download/windows/
2. Установите PostgreSQL (добавит `pg_config` в PATH)
3. Перезапустите терминал
4. Попробуйте установить снова:
   ```powershell
   cd backend
   .\venv\Scripts\python.exe -m pip install -r requirements.txt
   ```

## Решение 2: Использовать предкомпилированные wheels

Попробуйте установить с флагом для принудительного использования бинарных пакетов:

```powershell
cd backend
.\venv\Scripts\python.exe -m pip install psycopg2-binary --only-binary :all: --no-cache-dir
```

## Решение 3: Установить все пакеты кроме psycopg2-binary, затем его отдельно

```powershell
cd backend
# Установить все кроме psycopg2-binary
.\venv\Scripts\python.exe -m pip install fastapi==0.104.1 "uvicorn[standard]==0.24.0" sqlalchemy==2.0.23 pydantic==2.5.0 pydantic-settings==2.1.0 "python-jose[cryptography]==3.3.0" "passlib[bcrypt]==1.7.4" python-multipart==0.0.6 supabase==2.0.3 python-dotenv==1.0.0

# Затем попробовать установить psycopg2-binary
.\venv\Scripts\python.exe -m pip install psycopg2-binary --no-build-isolation
```

## Решение 4: Использовать psycopg (новая версия)

Если ничего не помогает, можно использовать `psycopg` вместо `psycopg2-binary`:

1. Замените в `requirements.txt`:
   ```
   psycopg[binary]>=3.1.0
   ```

2. Обновите `backend/app/core/database.py`:
   ```python
   # Вместо postgresql:// используйте postgresql+psycopg://
   DATABASE_URL = settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg://")
   ```

## Быстрая проверка

После установки проверьте:
```powershell
cd backend
.\venv\Scripts\python.exe -c "import psycopg2; print('psycopg2 installed!')"
```

