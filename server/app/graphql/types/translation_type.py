# app/graphql/types/translation_type.py
import strawberry

@strawberry.type
class TranslationType:
    id: strawberry.ID
    text: str
    translated_text: str
    match: float
    source: str
    target: str
