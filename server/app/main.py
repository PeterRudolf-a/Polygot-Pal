from fastapi import FastAPI, HTTPException
from app.models.user import UserCreate, UserLogin
from app.db.db import users_collection
from app.auth.auth import hash_password, verify_password
from app.auth.jwt_utils import create_access_token
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello from the FastAPI server!"}