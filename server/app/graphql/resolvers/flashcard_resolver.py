from app.db.db import flashcard_results_collection
from datetime import datetime, timezone
from app.auth.jwt_utils import decode_token
from app.graphql.types.flashcard_result_type import FlashcardResultType
import strawberry

@strawberry.type
class FlashcardQuery:
    @strawberry.field
    def get_flashcard_results(self, token: str) -> list[FlashcardResultType]:
        user_id = decode_token(token)["user_id"]
        results = flashcard_results_collection.find({"user_id": user_id})
        return [
            FlashcardResultType(
                id=str(r["_id"]),
                date=r["timestamp"].strftime("%Y-%m-%d"),
                correct=r["correct"],
                total=r["total"],
                language=r["language"],
            ) for r in results
        ]
