from fastapi import APIRouter, Depends
from ..auth.dependencies import get_current_user
from ..db import db
from ..models.results import Result
from datetime import datetime

router = APIRouter(prefix="/results", tags=["results"])

@router.post("/")
async def save_result(result: Result, user=Depends(get_current_user)):
    result_dict = result.dict()
    result_dict["user_id"] = user["id"]
    result_dict["timestamp"] = datetime.utcnow()
    await db.results.insert_one(result_dict)
    return {"message": "Result saved"}

@router.get("/")
async def get_user_results(user=Depends(get_current_user)):
    results = await db.results.find({"user_id": user["id"]}).to_list(length=100)
    return results
