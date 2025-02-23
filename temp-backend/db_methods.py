from pymongo import MongoClient

# MongoDB connection string
MONGO_URI = "your_mongodb_connection_string_here"
client = MongoClient(MONGO_URI)
db = client["Chipi-Chipi-db"]
collection = db["movies"]

def find_user_by_username(username):
    try:
        # Search for the user by username in the database
        user = collection.find_one({"username": username})
        return user  # Return the user if found
    except Exception as e:
        return {"error": str(e)}  # Return the error message if something goes wrong
