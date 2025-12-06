# Инструкции по настройке проекта

## ✅ Что уже настроено

1. ✅ База данных Supabase подключена
2. ✅ Файлы `.env` созданы с вашими данными
3. ✅ `database.py` обновлен для работы с Supabase
4. ✅ SQL миграция выполнена
5. ✅ Storage bucket `files` создан

## 🔧 Что нужно сделать

### 1. Сгенерировать JWT Secret Key

**Важно:** Текущий JWT_SECRET_KEY в `backend/.env` - это placeholder. Нужно заменить на безопасный ключ.

#### Вариант 1: Использовать Python скрипт
```bash
cd backend
python generate_jwt_secret.py
```
Скопируйте сгенерированный ключ и замените `JWT_SECRET_KEY` в `backend/.env`

#### Вариант 2: Вручную (если Python не установлен)
Замените в `backend/.env`:
```
JWT_SECRET_KEY=ваш-длинный-случайный-ключ-минимум-32-символа
```

### 2. Установить зависимости

#### Frontend:
```bash
cd frontend
npm install
```

#### Backend:
```bash
cd backend
pip install -r requirements.txt
```

### 3. Запустить приложения

#### Backend (в одном терминале):
```bash
cd backend
uvicorn app.main:app --reload
```
Backend будет доступен на `http://localhost:8000`

#### Frontend (в другом терминале):
```bash
cd frontend
npm run dev
```
Frontend будет доступен на `http://localhost:3000` (или порт из vite.config.ts)

### 4. Проверить работу

1. Откройте `http://localhost:3000`
2. Попробуйте зарегистрироваться
3. Проверьте, что данные сохраняются в Supabase

## 🚀 Деплой на Vercel

### Frontend:

1. В Vercel Dashboard создайте новый проект
2. Подключите GitHub репозиторий
3. Настройки:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   VITE_SUPABASE_URL=https://rrisqutxlkamwfhcashl.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Backend:

1. В Vercel Dashboard создайте новый проект (или используйте монорепо)
2. Настройки:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Python Version:** 3.11+

3. Environment Variables:
   ```
   SUPABASE_URL=https://rrisqutxlkamwfhcashl.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (Service Role Key)
   SUPABASE_STORAGE_BUCKET=files
   DATABASE_URL=postgresql://postgres:3%3F6%2Br%25EsSMBNi.Z@db.rrisqutxlkamwfhcashl.supabase.co:5432/postgres?sslmode=require
   JWT_SECRET_KEY=ваш-сгенерированный-ключ
   JWT_ALGORITHM=HS256
   JWT_ACCESS_TOKEN_EXPIRE_MINUTES=43200
   CORS_ORIGINS=https://your-frontend-url.vercel.app
   ```

## ⚠️ Важные замечания

1. **JWT_SECRET_KEY** - обязательно замените на безопасный ключ перед деплоем
2. **Service Role Key** - никогда не публикуйте в репозитории, используйте только в переменных окружения
3. **CORS_ORIGINS** - укажите реальные URL ваших приложений в продакшене
4. **Database Password** - уже закодирован в connection string (спецсимволы URL-encoded)

## 📝 Проверка подключения

После запуска backend, проверьте:
- `http://localhost:8000/health` - должен вернуть `{"status": "ok"}`
- `http://localhost:8000/docs` - Swagger документация API

## 🐛 Решение проблем

### Ошибка подключения к БД:
- Проверьте, что пароль правильно закодирован в `DATABASE_URL`
- Убедитесь, что `sslmode=require` присутствует в connection string

### Ошибка CORS:
- Проверьте `CORS_ORIGINS` в `backend/.env`
- Убедитесь, что frontend URL добавлен в список

### Ошибка загрузки файлов:
- Проверьте, что bucket `files` создан в Supabase Storage
- Убедитесь, что bucket публичный (если нужен публичный доступ)

