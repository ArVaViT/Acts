from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, AuthResponse
from app.schemas.user import UserResponse
from app.services.auth_service import register_user, authenticate_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.options("/register", include_in_schema=False)
async def options_register(request: Request):
    """Handle OPTIONS preflight requests for register endpoint"""
    origin = request.headers.get("origin", "*")
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": origin if origin != "*" else "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, X-Requested-With",
            "Access-Control-Max-Age": "3600",
        }
    )


@router.options("/login", include_in_schema=False)
async def options_login(request: Request):
    """Handle OPTIONS preflight requests for login endpoint"""
    origin = request.headers.get("origin", "*")
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": origin if origin != "*" else "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, X-Requested-With",
            "Access-Control-Max-Age": "3600",
        }
    )


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: RegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        user, access_token = register_user(db, user_data)
        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.model_validate(user)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        # Логируем ошибку для отладки
        import traceback
        print(f"Registration error: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.post("/login", response_model=AuthResponse)
async def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    try:
        user, access_token = authenticate_user(db, login_data)
        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.model_validate(user)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )
    except Exception as e:
        # Логируем ошибку для отладки
        import traceback
        print(f"Login error: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}"
        )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    return UserResponse.model_validate(current_user)


@router.post("/test-register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def test_register_endpoint(
    user_data: RegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Тестовый endpoint для проверки регистрации
    Создает пользователя и возвращает результат
    """
    try:
        user, access_token = register_user(db, user_data)
        return AuthResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse.model_validate(user)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        import traceback
        error_detail = {
            "error": str(e),
            "error_type": type(e).__name__,
            "traceback": traceback.format_exc()
        }
        print(f"Test registration error: {error_detail}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_detail
        )


@router.get("/auto-test-register")
async def auto_test_register(db: Session = Depends(get_db)):
    """
    Автоматический тест регистрации - создает тестового пользователя при GET запросе
    Можно просто открыть в браузере: /api/v1/auth/auto-test-register
    """
    import uuid
    from datetime import datetime
    
    timestamp = int(datetime.now().timestamp())
    test_email = f"auto_test_{timestamp}@example.com"
    test_password = "autotest123"
    test_name = f"Auto Test User {timestamp}"
    
    try:
        # Создаем тестового пользователя
        user, access_token = register_user(
            db,
            RegisterRequest(
                email=test_email,
                password=test_password,
                full_name=test_name
            )
        )
        
        return {
            "status": "success",
            "message": "Тестовый пользователь успешно создан!",
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.full_name,
                "role": user.role.value if hasattr(user.role, 'value') else str(user.role)
            },
            "access_token": access_token[:50] + "..." if len(access_token) > 50 else access_token,
            "test_data": {
                "email": test_email,
                "password": test_password,
                "full_name": test_name
            },
            "note": "Этот пользователь создан для тестирования и останется в базе данных"
        }
    except ValueError as e:
        return {
            "status": "error",
            "error_type": "validation_error",
            "message": str(e),
            "test_data": {
                "email": test_email,
                "password": test_password,
                "full_name": test_name
            }
        }
    except Exception as e:
        import traceback
        return {
            "status": "error",
            "error_type": type(e).__name__,
            "message": str(e),
            "traceback": traceback.format_exc(),
            "test_data": {
                "email": test_email,
                "password": test_password,
                "full_name": test_name
            }
        }

