import strawberry
from app.auth.jwt_utils import decode_token
from app.db.db import users_collection
from app.auth.auth import hash_password, verify_password
from app.auth.jwt_utils import create_access_token
from app.graphql.types.user_type import UserType, AuthPayload

@strawberry.type
class UserQuery:
    @strawberry.field
    def get_current_user(self, token: str) -> UserType:
        try:
            # Decode the token to get user information
            decoded = decode_token(token)
            user_id = decoded["user_id"]

            # Fetch user from database
            user_data = users_collection.find_one({"_id": user_id})

            if not user_data:
                raise Exception("User not found")
            
            return UserType(
                id=str(user_data["_id"]),
                name=user_data["name"],
                email=user_data["email"]
            )

        except Exception as e:
            raise Exception(f"Error getting current user: {str(e)}")


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

        token = create_access_token({"sub": str(user["_id"])})
        return AuthPayload(
            token=token,
            user=UserType(id=str(user["_id"]), name=user["name"], email=user["email"])
        )
