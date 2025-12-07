# Скрипт для тестирования регистрации
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))
$email = "test_user_$timestamp@example.com"
$body = @{
    email = $email
    password = "testpass123"
    full_name = "Test User API"
} | ConvertTo-Json

Write-Host "=========================================="
Write-Host "Тестирование регистрации"
Write-Host "=========================================="
Write-Host "URL: https://biblie-school-backend.vercel.app/api/v1/auth/register"
Write-Host "Email: $email"
Write-Host "Имя: Test User API"
Write-Host "=========================================="
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "https://biblie-school-backend.vercel.app/api/v1/auth/register" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -Headers @{"Origin"="https://biblie-school-frontend.vercel.app"} `
        -ErrorAction Stop
    
    Write-Host "✅ УСПЕХ! Пользователь зарегистрирован:" -ForegroundColor Green
    Write-Host "   ID: $($response.user.id)"
    Write-Host "   Email: $($response.user.email)"
    Write-Host "   Имя: $($response.user.full_name)"
    Write-Host "   Токен: $($response.access_token.Substring(0, 20))..."
    Write-Host ""
    Write-Host "Полный ответ:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
    
    # Сохраняем в файл
    $response | ConvertTo-Json -Depth 10 | Out-File -FilePath "test_register_result.json" -Encoding UTF8
    Write-Host ""
    Write-Host "Результат сохранен в test_register_result.json" -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ ОШИБКА:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.ErrorDetails.Message) {
        Write-Host "Детали: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Статус код: $($_.Exception.Response.StatusCode.value__)"
}
