from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.translation import translate_text

router = APIRouter()

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

@router.post("/translate")
def translate(request: TranslationRequest):
    result = translate_text(request.text, request.source_lang, request.target_lang)
    return result
