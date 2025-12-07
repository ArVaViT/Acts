"""
Скрипт для создания тестового пользователя через API
Использует реальный endpoint для проверки всего процесса регистрации
"""
import requests
import json
import time
import sys

API_URL = "https://biblie-school-backend.vercel.app/api/v1/auth/test-register"

def create_test_user(email_suffix=None):
    """Создает тестового пользователя через API"""
    timestamp = int(time.time())
    
    if email_suffix:
        email = f"test_{email_suffix}_{timestamp}@example.com"
    else:
        email = f"test_user_{timestamp}@example.com"
    
    data = {
        "email": email,
        "password": "testpass123",
        "full_name": f"Test User {timestamp}"
    }
    
    print(f"\n{'='*70}")
    print(f"Создание тестового пользователя через API")
    print(f"{'='*70}")
    print(f"URL: {API_URL}")
    print(f"Email: {email}")
    print(f"Пароль: testpass123")
    print(f"Имя: Test User {timestamp}")
    print(f"{'='*70}\n")
    
    try:
        response = requests.post(
            API_URL,
            json=data,
            headers={
                "Content-Type": "application/json",
                "Origin": "https://biblie-school-frontend.vercel.app"
            },
            timeout=30
        )
        
        result = {
            "timestamp": timestamp,
            "request_data": data,
            "status_code": response.status_code,
            "response_headers": dict(response.headers),
        }
        
        try:
            response_json = response.json()
            result["response_data"] = response_json
            
            if response.status_code == 201:
                print("✅ УСПЕХ! Пользователь создан через API:")
                print(f"   ID: {response_json.get('user', {}).get('id', 'N/A')}")
                print(f"   Email: {response_json.get('user', {}).get('email', 'N/A')}")
                print(f"   Имя: {response_json.get('user', {}).get('full_name', 'N/A')}")
                print(f"   Роль: {response_json.get('user', {}).get('role', 'N/A')}")
                print(f"   Токен: {'Получен' if response_json.get('access_token') else 'Не получен'}")
                result["success"] = True
            else:
                print(f"❌ ОШИБКА: Статус код {response.status_code}")
                print(f"   Детали: {response_json.get('detail', 'N/A')}")
                result["success"] = False
                
        except json.JSONDecodeError:
            result["response_text"] = response.text
            result["success"] = False
            print(f"❌ ОШИБКА: Не удалось распарсить JSON ответ")
            print(f"   Ответ: {response.text[:500]}")
        
        # Сохраняем результат
        filename = f"test_user_result_{timestamp}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"\nРезультат сохранен в: {filename}")
        
        return result
        
    except requests.exceptions.RequestException as e:
        error_result = {
            "timestamp": timestamp,
            "request_data": data,
            "error": str(e),
            "error_type": type(e).__name__,
            "success": False
        }
        
        if hasattr(e, 'response') and e.response:
            error_result["status_code"] = e.response.status_code
            try:
                error_result["response_data"] = e.response.json()
            except:
                error_result["response_text"] = e.response.text
        
        filename = f"test_user_error_{timestamp}.json"
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(error_result, f, indent=2, ensure_ascii=False)
        
        print(f"❌ ОШИБКА ЗАПРОСА: {str(e)}")
        print(f"Детали сохранены в: {filename}")
        
        return error_result

if __name__ == "__main__":
    # Создаем несколько тестовых пользователей
    print("Создание тестовых пользователей через API...\n")
    
    # Тест 1: Базовый пользователь
    result1 = create_test_user("api_basic")
    
    # Тест 2: Второй пользователь
    time.sleep(1)
    result2 = create_test_user("api_second")
    
    # Тест 3: Пользователь с русским именем
    time.sleep(1)
    timestamp3 = int(time.time())
    data3 = {
        "email": f"test_russian_{timestamp3}@example.com",
        "password": "testpass123",
        "full_name": f"Иван Иванов {timestamp3}"
    }
    
    print(f"\n{'='*70}")
    print(f"Тест 3: Пользователь с русским именем")
    print(f"{'='*70}")
    try:
        response3 = requests.post(
            API_URL,
            json=data3,
            headers={
                "Content-Type": "application/json",
                "Origin": "https://biblie-school-frontend.vercel.app"
            },
            timeout=30
        )
        
        if response3.status_code == 201:
            print("✅ УСПЕХ!")
            print(json.dumps(response3.json(), indent=2, ensure_ascii=False))
        else:
            print(f"❌ ОШИБКА: {response3.status_code}")
            print(response3.text)
    except Exception as e:
        print(f"❌ ОШИБКА: {e}")
    
    print(f"\n{'='*70}")
    print("Тестирование завершено!")
    print(f"{'='*70}")
