from flask import Flask, request, jsonify
import pickle
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
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
    power = 0
    health = 0
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
        access_token = create_access_token(identity=username)  # Generate JWT token
        return jsonify({"token": access_token}), 200
    else:
        # If user is not found, return a 404 response
        return jsonify({"error": "User not found"}), 404


@app.route("/save_boss", methods=["POST"])
#@jwt_required()
def save_boss():
    users = db["users"]
    bosses = db["bosses"]
    data = request.get_json()
    boss_name = data.get("Name")
    username = data.get("username")


    # Find user and boss
    user = users.find_one({"username": username})
    boss = bosses.find_one({"Name": boss_name})  # No need to convert boss_name to ObjectId

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not boss:
        return jsonify({"message": "Boss not found"}), 404  # Changed the message here

    boss_id = boss.get("_id")

    # Avoid duplicates
    if str(boss_id) in user.get("defeated_bosses", []):
        return jsonify({"message": "Boss already saved"}), 400  # Changed the message here

    # Save boss to user's defeated_bosses list
    users.update_one({"username": username}, {"$push": {"defeated_bosses": boss}})

    return jsonify({"message": "Boss saved successfully"})



if __name__ == "__main__":
    app.run(host="10.40.144.249", port=5000, debug=True)




