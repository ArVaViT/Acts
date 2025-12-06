from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.config import settings
from app.api.v1 import api_router

app = FastAPI(
    title="Bible School API",
    description="API for Bible School courses platform",
    version="1.0.0"
)

# CORS origins configuration
try:
    cors_origins = settings.cors_origins_list if settings.cors_origins_list else ["*"]
except Exception:
    cors_origins = ["*"]

# Нельзя использовать credentials с "*"
allow_credentials = "*" not in cors_origins

# Middleware для обработки OPTIONS запросов ДО всего остального
class OptionsMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            return Response(
                status_code=200,
                headers={
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Max-Age": "3600",
                }
            )
        return await call_next(request)

# Добавляем OPTIONS middleware ПЕРВЫМ
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

