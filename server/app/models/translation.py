# app/models/translation.py
from pydantic import BaseModel

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

class TranslationResponse(BaseModel):
    translated_text: str
    match: float
    source: str
    target: str
