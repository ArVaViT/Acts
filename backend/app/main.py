from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
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

# CORS middleware - handles OPTIONS automatically
# Note: allow_origins=["*"] with allow_credentials=True is not allowed by browsers
# So we use explicit origins or "*" without credentials
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if cors_origins != ["*"] else ["*"],
    allow_credentials=allow_credentials,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
    allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With", "Access-Control-Request-Method", "Access-Control-Request-Headers"],
    expose_headers=["*"],
    max_age=3600,
)

# Catch-all OPTIONS handler at app level (before router) as fallback
@app.options("/{full_path:path}", include_in_schema=False)
async def options_handler(request: Request):
    """Catch-all OPTIONS handler for all paths - fallback if CORSMiddleware doesn't catch it"""
    origin = request.headers.get("origin", "*")
    # Use the origin from request if it's in allowed origins, otherwise use "*"
    allowed_origin = "*"
    if origin and origin != "*":
        if cors_origins == ["*"] or origin in cors_origins:
            allowed_origin = origin
    
    headers = {
        "Access-Control-Allow-Origin": allowed_origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept, Origin, X-Requested-With",
        "Access-Control-Max-Age": "3600",
    }
    
    if allow_credentials and allowed_origin != "*":
        headers["Access-Control-Allow-Credentials"] = "true"
    
    return Response(status_code=200, headers=headers)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "Bible School API", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}


# Обработчики для статических файлов, которые браузер запрашивает автоматически
# Эти запросы не должны ломать логи, просто возвращаем пустой ответ
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    """Обработчик для favicon - браузер запрашивает его автоматически"""
    return Response(status_code=204)  # No Content


@app.get("/vite.svg", include_in_schema=False)
@app.get("/favicon.png", include_in_schema=False)
@app.get("/favicon.svg", include_in_schema=False)
async def static_icons():
    """Обработчики для иконок - браузер может запрашивать их автоматически"""
    return Response(status_code=204)  # No Content

