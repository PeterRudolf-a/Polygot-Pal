# app/graphql/types/translation_type.py
import strawberry
from typing import Optional

@strawberry.type
class TranslationType:
    id: Optional[str]
    text: Optional[str]
    translated_text: str
    match: Optional[float]
    source_lang: str
    target_lang: str

