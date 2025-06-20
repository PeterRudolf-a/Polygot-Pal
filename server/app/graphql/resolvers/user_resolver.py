import strawberry
from app.auth.jwt_utils import decode_token
from app.db.db import users_collection
from app.auth.auth import hash_password, verify_password
from app.auth.jwt_utils import create_access_token
from app.graphql.types.user_type import UserType, AuthPayload

@strawberry.type
class UserQuery:
    @strawberry.mutation
    def create_user(self, name: str, email: str, password: str) -> AuthPayload:
        hashed_pw = hash_password(password)
        new_user = {"name": name, "email": email, "hashed_password": hashed_pw}
        result = users_collection.insert_one(new_user)
        user_id = str(result.inserted_id)

        token = create_access_token({"user_id": user_id, "name": name, "email": email})

        return AuthPayload(
            token=token,
            user=UserType(id=user_id, name=name, email=email)
        )



@strawberry.type
class UserMutation:
    @strawberry.mutation
    def create_user(self, name: str, email: str, password: str) -> AuthPayload:
        existing_user = users_collection.find_one({"email": email})
        if existing_user:
            raise Exception("Email already registered")

        hashed_pw = hash_password(password)
        new_user = {"name": name, "email": email, "hashed_password": hashed_pw}
        result = users_collection.insert_one(new_user)

        token = create_access_token({"user_id": str(result.inserted_id)})
        return AuthPayload(
            token=token,
            user=UserType(id=str(result.inserted_id), name=name, email=email)
        )

    @strawberry.mutation
    def login_user(self, email: str, password: str) -> AuthPayload:
        user = users_collection.find_one({"email": email})
        if not user or not verify_password(password, user["hashed_password"]):
            raise Exception("Invalid credentials")

        token = create_access_token({"user_id": str(user["_id"])})

        return AuthPayload(
            token=token,
            user=UserType(id=str(user["_id"]), name=user["name"], email=user["email"])
        )
