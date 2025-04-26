# app/graphql/schema.py
import strawberry
from app.graphql.resolvers.user_resolver import UserQuery, UserMutation
from app.graphql.resolvers.translation_resolver import TranslationQuery, TranslationMutation

@strawberry.type
class Query(UserQuery, TranslationQuery):
    pass

@strawberry.type
class Mutation(UserMutation, TranslationMutation):
    pass

schema = strawberry.Schema(query=Query, mutation=Mutation)
