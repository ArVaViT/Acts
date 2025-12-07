#!/usr/bin/env python3
"""
Скрипт для тестирования регистрации через реальный API
"""
import requests
import json
import sys
import os
from datetime import datetime

API_URL = "https://biblie-school-backend.vercel.app/api/v1/auth/register"
OUTPUT_FILE = "test_register_result.json"

def test_register(email, password, full_name):
    """Тестирует регистрацию пользователя"""
    print(f"\n{'='*60}")
    print(f"Тестирование регистрации")
    print(f"{'='*60}")
    print(f"URL: {API_URL}")
    print(f"Email: {email}")
    print(f"Имя: {full_name}")
    print(f"Время: {datetime.now().isoformat()}")
    print(f"{'='*60}\n")
    
    # Данные для регистрации
    data = {
        "email": email,
        "password": password,
        "full_name": full_name
    }
    
    # Заголовки
    headers = {
        "Content-Type": "application/json",
        "Origin": "https://biblie-school-frontend.vercel.app"
    }
    
    try:
        print("Отправка POST запроса...")
        response = requests.post(
            API_URL,
            json=data,
            headers=headers,
            timeout=30
        )
        
        print(f"\nСтатус код: {response.status_code}")
        print(f"Заголовки ответа:")
        for key, value in response.headers.items():
            if key.lower().startswith('access-control') or key.lower() == 'content-type':
                print(f"  {key}: {value}")
        
        print(f"\nТело ответа:")
        try:
            response_json = response.json()
            print(json.dumps(response_json, indent=2, ensure_ascii=False))
            
            if response.status_code == 201:
                print(f"\n✅ УСПЕХ! Пользователь зарегистрирован:")
                print(f"   ID: {response_json.get('user', {}).get('id', 'N/A')}")
                print(f"   Email: {response_json.get('user', {}).get('email', 'N/A')}")
                print(f"   Имя: {response_json.get('user', {}).get('full_name', 'N/A')}")
                print(f"   Токен получен: {'Да' if response_json.get('access_token') else 'Нет'}")
                
                # Сохраняем результат в файл
                with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                    json.dump(response_json, f, indent=2, ensure_ascii=False)
                print(f"\nРезультат сохранен в {OUTPUT_FILE}")
                
                return True
            else:
                print(f"\n❌ ОШИБКА: {response.status_code}")
                return False
                
        except json.JSONDecodeError:
            print(response.text)
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"\n❌ ОШИБКА ЗАПРОСА: {str(e)}")
        error_info = {
            "error": str(e),
            "error_type": type(e).__name__,
            "status_code": getattr(e.response, 'status_code', None) if hasattr(e, 'response') else None,
            "response_text": e.response.text if hasattr(e, 'response') and e.response else None
        }
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(error_info, f, indent=2, ensure_ascii=False)
        print(f"Ошибка сохранена в {OUTPUT_FILE}")
        return False

if __name__ == "__main__":
    # Генерируем уникальный email
    timestamp = int(datetime.now().timestamp())
    
    # Тест 1: Базовая регистрация
    email1 = f"test_user_{timestamp}@example.com"
    test_register(email1, "testpass123", "Test User")
    
    # Тест 2: Еще один пользователь
    timestamp2 = timestamp + 1
    email2 = f"test_user_{timestamp2}@example.com"
    test_register(email2, "mypassword456", "Иван Иванов")
    
    # Тест 3: Проверка дубликата (должна быть ошибка)
    print(f"\n{'='*60}")
    print("Тест 3: Попытка регистрации с существующим email (должна быть ошибка)")
    print(f"{'='*60}\n")
    test_register(email1, "anotherpass", "Duplicate User")
