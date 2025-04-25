import strawberry

@strawberry.type
class UserType:
    id: str
    name: str
    email: str

@strawberry.type
class AuthPayload:
    token: str
    user: UserType
