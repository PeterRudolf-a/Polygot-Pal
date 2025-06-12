# app/graphql/resolvers/translation_resolver.py
import strawberry # importing strawberry for GraphQL schema creation
import uuid # importing uuid for generating unique IDs
from app.db.db import translations_collection # importing translations_collection from the database module
from app.services.translation import translate_text # importing translate_text service for translation functionality
from app.graphql.types.translation_type import TranslationType # importing TranslationType for defining the GraphQL type
from app.auth.jwt_utils import decode_token # importing decode_token for JWT token decoding
from datetime import datetime, timezone # importing datetime and timezone for timestamp handling

# GraphQL Query and Mutation for Translation
@strawberry.type
class TranslationQuery:
    @strawberry.field
    def get_user_translations(self, token: str) -> list[TranslationType]:
        try:
            decoded = decode_token(token)
            user_id = decoded["user_id"]

            # Fetch translations from the database
            translations = translations_collection.find({"user_id": user_id})

            # Convert MongoDB cursor to list of TranslationType
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


# GraphQL Mutation for Translation
@strawberry.type
class TranslationMutation:
    @strawberry.mutation
    def translate(self, text: str, source_lang: str, target_lang: str) -> TranslationType:
        response = translate_text(text, source_lang, target_lang)
        return TranslationType(
            id=str(uuid.uuid4()),
            text=text,
            translated_text=response["translated_text"],
            match=response["match"],
            source_lang=response["source"],  # ✅ Fix key names
            target_lang=response["target"]
        )



    # GraphQL Mutation to save a translation
    @strawberry.mutation
    def save_translation(self, token: str, text: str, translated_text: str, source_lang: str, target_lang: str) -> TranslationType:
        decoded = decode_token(token)
        user_id = decoded.get("user_id")
        if not user_id:
            raise Exception("Error saving translation: invalid token")

        translation_doc = {
            "user_id": user_id,
            "text": text,
            "translated_text": translated_text,
            "source_lang": source_lang,
            "target_lang": target_lang,
            "timestamp": datetime.now(timezone.utc)
        }
        res = translations_collection.insert_one(translation_doc)

        return TranslationType(
            id=str(res.inserted_id),
            text=text,
            translated_text=translated_text,
            match=None,  # optional since saved
            source_lang=source_lang,
            target_lang=target_lang
        )

