import strawberry
from app.graphql.resolvers.user_resolver import UserMutation
from app.graphql.resolvers.translation_resolver import TranslationMutation

@strawberry.type
class Mutation(UserMutation, TranslationMutation):
    pass

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello from Polyglot Pal!"

schema = strawberry.Schema(query=Query, mutation=Mutation)
