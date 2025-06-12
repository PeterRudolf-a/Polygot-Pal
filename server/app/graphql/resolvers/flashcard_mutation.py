import strawberry
from app.auth.jwt_utils import decode_token
from datetime import datetime, timezone
from app.db.db import flashcard_results_collection


@strawberry.type
class FlashcardMutation:
    @strawberry.mutation
    def save_flashcard_result(self, token: str, correct: int, total: int, language: str, incorrect_words: list[str]) -> bool:
        user_id = decode_token(token)["user_id"]
        flashcard_results_collection.insert_one({
            "user_id": user_id,
            "correct": correct,
            "total": total,
            "language": language,
            "incorrect_words": incorrect_words,
            "timestamp": datetime.now(timezone.utc)
        })
        return True
