# app/graphql/resolvers/translation_resolver.py
import strawberry
from app.services.translation import translate_text
from app.graphql.types.translation_type import TranslationType

@strawberry.type
class TranslationMutation:
    @strawberry.mutation
    def translate(self, text: str, source_lang: str, target_lang: str) -> TranslationType:
        response = translate_text(text, source_lang, target_lang)
        return TranslationType(
            translated_text=response["translated_text"],
            match=response["match"],
            source=response["source"],
            target=response["target"]
        )
