#!/usr/bin/env python3
"""Generate a secure JWT secret key"""
import secrets

if __name__ == "__main__":
    secret = secrets.token_urlsafe(32)
    print(f"JWT_SECRET_KEY={secret}")
    print("\nCopy this key to your .env file")

