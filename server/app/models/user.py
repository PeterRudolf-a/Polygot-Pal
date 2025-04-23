from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(BaseModel):
    id: str
    name: str
    email: EmailStr
    hashed_password: str
