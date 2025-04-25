# app/graphql/types/translation_type.py
import strawberry

@strawberry.type
class TranslationType:
    translated_text: str
    match: float
    source: str
    target: str
