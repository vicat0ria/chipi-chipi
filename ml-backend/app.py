from flask import Flask, request, jsonify
import pickle
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from pymongo import MongoClient
import bcrypt

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def verify_password(input_password, hashed_password):
    return bcrypt.checkpw(input_password.encode('utf-8'), hashed_password)


app = Flask(__name__)

# Load trained model
with open("model.pkl", "rb") as f:
    model, vectorizer = pickle.load(f)

@app.route("/")
def home():
    return "Flask is running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data["text"]
    
    text_vectorized = vectorizer.transform([text])
    prediction = model.predict(text_vectorized)[0]
    
    return jsonify({"prediction": int(prediction)})


# MongoDB connection string
MONGO_URI = "mongodb+srv://albertosandoval950:y6fmhzmwJMY0kZV9@users.a7kxh.mongodb.net/?retryWrites=true&w=majority&appName=Users"
client = MongoClient(MONGO_URI)
db = client["LevelUp"]
collection = db["users"]


# Helper function to convert ObjectId to string
def serialize_user(user):
    user['_id'] = str(user['_id'])  # Convert _id to string (for JSON serialization)
    return user

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json();

    username = data.get("username")
    password = data.get("password")
    experience_points = 0
    level = 0
    power = 1
    health = 10
    dexterity = 0


    if not username or not password:
        return jsonify({"error":"Missing required fields"}), 400


    if collection.find_one({"username": username}) is not None:
        return jsonify({"error":"Username already taken"}), 400

    hashed_password = hash_password(password)
    user = {
        "username":username,
        "password":hashed_password.decode("utf-8"),
        "level": level,
        "power": power,
        "health": health,
        "experience": experience_points,
        "dexterity": dexterity
    }
    collection.insert_one(user)

    return jsonify({"message":"User registered successfully"}), 201



@app.route('/login', methods=['GET'])
def get_user():
    # Get the username from the request arguments
    data = request.get_json();

    username = data.get("username")
    inputted_password = data.get("password")

    user = collection.find_one({"username": username})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Query the database for the user with the inputted username

    print(user)

    correct_password = user["password"].encode("utf-8")

    if user and verify_password(inputted_password,correct_password):
        # If user is found, return the user object (with _id serialized)
        return jsonify(serialize_user(user)), 200
    else:
        # If user is not found, return a 404 response
        return jsonify({"error": "User not found"}), 404


@app.route("/save_boss", methods=["POST"])
@jwt_required()
def save_boss():
    user_id = get_jwt_identity()
    users = mongo.db.users
    bosses = mongo.db.bosses
    boss_name = request.get_json().get("Name")

    # Find user and item
    user = users.find_one({"_id": ObjectId(user_id)})
    boss = bosses.find_one({"Name": ObjectId(boss_name)})
    boss_id = boss.get("_id")

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not boss:
        return jsonify({"message": "Item not found"}), 404

    # Avoid duplicates
    if str(boss_id) in user.get("defeated_bosses", []):
        return jsonify({"message": "Item already saved"}), 400

    # Save item
    users.update_one({"_id": ObjectId(user_id)}, {"$push": {"defeated_bosses": str(boss["_id"])}})

    return jsonify({"message": "Item saved successfully"})



if __name__ == "__main__":
    app.run(host="10.40.144.249", port=5000, debug=True)




