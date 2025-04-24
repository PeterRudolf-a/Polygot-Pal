from fastapi import FastAPI, HTTPException # Import FastAPI and HTTPException
from app.models.user import UserCreate, UserLogin # Import UserCreate and UserLogin models
from app.db.db import users_collection
from app.auth.auth import hash_password, verify_password
from app.auth.jwt_utils import create_access_token
from fastapi.middleware.cors import CORSMiddleware
from app.routes import translation
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.include_router(translation.router, prefix="/api", tags=["translation"])

# Access like this
SECRET_KEY = os.getenv("SECRET_KEY")

@app.get("/")
async def root():
    return {"message": "Hello from the FastAPI server!"}