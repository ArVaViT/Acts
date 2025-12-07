# Тестовые пользователи в базе данных

## Созданные пользователи

Я создал тестовых пользователей напрямую в базе данных Supabase для проверки.

### Пользователь 1: Direct DB Test
- **Email**: `test_direct_db_1765083259.902392@example.com`
- **ID**: `91fb6b42-00c1-4a78-9030-f143c54cc742`
- **Имя**: `Test User Direct DB`
- **Роль**: `student`
- **Создан**: `2025-12-07 04:54:19`

## Как проверить через API

### 1. Проверка через GET endpoint (автоматический тест)
Откройте в браузере:
```
https://biblie-school-backend.vercel.app/api/v1/auth/auto-test-register
```

Это создаст нового пользователя автоматически и покажет результат.

### 2. Проверка через POST endpoint
```bash
curl -X POST https://biblie-school-backend.vercel.app/api/v1/auth/test-register \
  -H "Content-Type: application/json" \
  -H "Origin: https://biblie-school-frontend.vercel.app" \
  -d '{
    "email": "test_manual_1234567890@example.com",
    "password": "testpass123",
    "full_name": "Manual Test User"
  }'
```

### 3. Проверка существующих пользователей в БД
Используйте Supabase MCP или SQL запрос:
```sql
SELECT id, email, full_name, role, created_at 
FROM users 
ORDER BY created_at DESC;
```

## Следующие шаги

1. Проверьте что API endpoint работает через браузер
2. Проверьте что пользователи создаются через POST запрос
3. Проверьте что можно войти с созданными пользователями
4. Проверьте переменные окружения в Vercel
