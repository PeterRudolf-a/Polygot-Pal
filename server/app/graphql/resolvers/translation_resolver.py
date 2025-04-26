# app/graphql/resolvers/translation_resolver.py
import strawberry
from app.db.db import translations_collection
from app.services.translation import translate_text
from app.graphql.types.translation_type import TranslationType
from app.auth.jwt_utils import decode_token
from datetime import datetime

@strawberry.type
class TranslationQuery:
    @strawberry.field
    def get_user_translations(self, token: str) -> list[TranslationType]:
        try:
            decoded = decode_token(token)
            user_id = decoded["user_id"]

            # Fetch translations from the database
            translations = translations_collection.find({"user_id": user_id})

            return [
                TranslationType(
                    id=str(translation["_id"]),
                    text=translation["text"],
                    translated_text=translation["translated_text"],
                    source_lang=translation["source_lang"],
                    target_lang=translation["target_lang"]
                )
                for translation in translations
            ]
        except Exception as e:
            raise Exception(f"Error fetching translations: {str(e)}")


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
    
    @strawberry.mutation
    def save_translation(self, token: str, text: str, translated_text: str, source_lang: str, target_lang: str) -> TranslationType:
        try:
            decoded = decode_token(token)
            user_id = decoded["user_id"]

            # Save translation to database
            translation = {
                "user_id": user_id,
                "text": text,
                "translated_text": translated_text,
                "source_lang": source_lang,
                "target_lang": target_lang,
                "timestamp": datetime.now(datetime.timezone.utc)
            }
            result = translations_collection.insert_one(translation)

            return TranslationType(
                id=str(result.inserted_id),
                text=text,
                translated_text=translated_text,
                source_lang=source_lang,
                target_lang=target_lang
            )
        except Exception as e:
            raise Exception(f"Error saving translation: {str(e)}")
