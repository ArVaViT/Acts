# Тестирование регистрации

## Тестовые данные для проверки

Используйте эти данные для тестирования регистрации через API:

### Тест 1: Базовая регистрация
```json
POST https://biblie-school-backend.vercel.app/api/v1/auth/test-register
Content-Type: application/json

{
  "email": "test_user_$(timestamp)@example.com",
  "password": "testpass123",
  "full_name": "Test User API"
}
```

### Тест 2: Регистрация с русским именем
```json
{
  "email": "ivan_$(timestamp)@example.com",
  "password": "mypassword456",
  "full_name": "Иван Иванов"
}
```

### Тест 3: Проверка дубликата (должна вернуть ошибку)
Попробуйте зарегистрировать того же пользователя дважды.

## Команды для тестирования

### PowerShell:
```powershell
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$email = "test_user_$timestamp@example.com"
$body = @{
    email = $email
    password = "testpass123"
    full_name = "Test User API"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://biblie-school-backend.vercel.app/api/v1/auth/test-register" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -Headers @{"Origin"="https://biblie-school-frontend.vercel.app"}
```

### Python:
```python
import requests
import time

timestamp = int(time.time())
data = {
    "email": f"test_user_{timestamp}@example.com",
    "password": "testpass123",
    "full_name": "Test User API"
}

response = requests.post(
    "https://biblie-school-backend.vercel.app/api/v1/auth/test-register",
    json=data,
    headers={"Content-Type": "application/json", "Origin": "https://biblie-school-frontend.vercel.app"}
)

print(response.status_code)
print(response.json())
```

### cURL:
```bash
curl -X POST https://biblie-school-backend.vercel.app/api/v1/auth/test-register \
  -H "Content-Type: application/json" \
  -H "Origin: https://biblie-school-frontend.vercel.app" \
  -d '{
    "email": "test_user_1234567890@example.com",
    "password": "testpass123",
    "full_name": "Test User API"
  }'
```

## Ожидаемый результат

При успешной регистрации вы должны получить:
- Статус код: `201 Created`
- Тело ответа с `access_token`, `token_type: "bearer"` и данными пользователя

При ошибке:
- Статус код: `400` или `500`
- Детали ошибки в поле `detail`
