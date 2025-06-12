# app/graphql/schema.py
import strawberry
from app.graphql.resolvers.user_resolver import UserQuery, UserMutation
from app.graphql.resolvers.translation_resolver import TranslationQuery, TranslationMutation
from app.graphql.resolvers.flashcard_mutation import FlashcardMutation  # ✅ Import this too

@strawberry.type
class Query(UserQuery, TranslationQuery):
    pass

@strawberry.type
class Mutation(UserMutation, TranslationMutation, FlashcardMutation):  # ✅ Include FlashcardMutation
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation, auto_camel_case=True)  # ✅ Enable camelCase
