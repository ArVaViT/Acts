from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.config import settings
from app.api.v1 import api_router

app = FastAPI(
    title="Bible School API",
    description="API for Bible School courses platform",
    version="1.0.0"
)

# CORS origins configuration
cors_origins = settings.cors_origins_list if settings.cors_origins_list else ["*"]
allow_credentials = "*" not in cors_origins  # Нельзя использовать credentials с "*"

# Middleware для обработки OPTIONS запросов ДО CORS middleware
class OptionsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            origin = request.headers.get("origin", "*")
            if "*" in cors_origins:
                allowed_origin = "*"
            else:
                allowed_origin = origin if origin in cors_origins else (cors_origins[0] if cors_origins else "*")
            
            headers = {
                "Access-Control-Allow-Origin": allowed_origin,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Max-Age": "3600",
            }
            if allow_credentials:
                headers["Access-Control-Allow-Credentials"] = "true"
            
            return Response(status_code=200, headers=headers)
        
        response = await call_next(request)
        return response

# Добавляем OPTIONS middleware ПЕРЕД CORS middleware
app.add_middleware(OptionsMiddleware)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "Bible School API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}

