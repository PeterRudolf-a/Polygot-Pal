from pydantic import BaseModel
from typing import List
from datetime import datetime

class AnswerItem(BaseModel):
    question: str
    correct_answer: str
    user_answer: str
    is_correct: bool

class Result(BaseModel):
    user_id: str
    timestamp: datetime
    topic: str
    answers: List[AnswerItem]
