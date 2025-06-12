from pymongo import MongoClient
import os

client = MongoClient(os.environ.get("MONGO_URI", "mongodb://localhost:27017"))
db = client["polyglotpal"]
users_collection = db["users"]
translations_collection = db["translations"]
flashcard_results_collection = db["flashcard_results"]