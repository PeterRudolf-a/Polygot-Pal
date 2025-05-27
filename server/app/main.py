from fastapi import FastAPI, HTTPException
from app.models.user import UserCreate, UserLogin
from app.db.db import users_collection
from strawberry.fastapi import GraphQLRouter
import strawberry
from app.auth.auth import hash_password, verify_password
from app.auth.jwt_utils import create_access_token
from fastapi.middleware.cors import CORSMiddleware
from app.routes import translation
from dotenv import load_dotenv
import os
from app.graphql.schema import schema

load_dotenv()

graphql_app = GraphQLRouter(schema)

app = FastAPI()

# ✅ CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routers
app.include_router(graphql_app, prefix="/graphql")
app.include_router(translation.router, prefix="/api", tags=["translation"])

SECRET_KEY = os.getenv("SECRET_KEY")

@app.get("/")
async def root():
    return {"message": "Hello from the FastAPI server!"}
