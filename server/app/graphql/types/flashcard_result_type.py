import strawberry

@strawberry.type
class FlashcardResultType:
    id: str
    date: str
    correct: int
    total: int
    language: str
