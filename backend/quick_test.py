import requests
import json
import time

timestamp = int(time.time())
email = f"test_user_{timestamp}@example.com"

data = {
    "email": email,
    "password": "testpass123",
    "full_name": "Test User API - Real Test"
}

print(f"Testing registration with email: {email}")

try:
    response = requests.post(
        "https://biblie-school-backend.vercel.app/api/v1/auth/test-register",
        json=data,
        headers={
            "Content-Type": "application/json",
            "Origin": "https://biblie-school-frontend.vercel.app"
        },
        timeout=30
    )
    
    result = {
        "status_code": response.status_code,
        "headers": dict(response.headers),
        "response": response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
    }
    
    with open("test_result.json", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    
    print(f"Status: {response.status_code}")
    print(f"Result saved to test_result.json")
    
except Exception as e:
    error_result = {
        "error": str(e),
        "error_type": type(e).__name__
    }
    with open("test_result.json", "w", encoding="utf-8") as f:
        json.dump(error_result, f, indent=2, ensure_ascii=False)
    print(f"Error: {e}")
    print(f"Error saved to test_result.json")
