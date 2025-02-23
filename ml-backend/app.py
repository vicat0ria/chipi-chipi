import os
from flask import Flask, request, jsonify
import pickle
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from pymongo import MongoClient
import bcrypt
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
from io import BytesIO

def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def verify_password(input_password, hashed_password):
    return bcrypt.checkpw(input_password.encode('utf-8'), hashed_password)


app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from different origins

# MongoDB connection string
MONGO_URI = "mongodb+srv://albertosandoval950:y6fmhzmwJMY0kZV9@users.a7kxh.mongodb.net/?retryWrites=true&w=majority&appName=Users"
client = MongoClient(MONGO_URI)
db = client["LevelUp"]
collection = db["users"]

# Initialize JWTManager with the Flask app
jwt = JWTManager(app)
# Generated with os.urandom(24).hex()
app.config['JWT_SECRET_KEY'] = 'c52aaf94e3221359641f0f0b82b80d0f214945ffa85264e0'


# Load trained model
#with open("model.pkl", "rb") as f:
   # model, vectorizer = pickle.load(f)
# Load your trained model (make sure your model is saved as 'model.h5' or update accordingly)
model = tf.keras.models.load_model('trained_model.h5')

def preprocess_image(image):
    """
    Preprocess the image for your model (resize, normalize, etc.).
    Modify based on your model's input size and type.
    """
    image = Image.open(image)
    image = image.convert("RGB")  # Ensure it's in RGB format
    image = image.resize((64, 64))  # Resize to the model's expected input size
    image = np.array(image)
    image = image / 255.0  # Normalize if needed
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route('/predict_rfc', methods=['POST'])
def predict():
    print(0)
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    # Get the uploaded file
    image_file = request.files['image']

    try:
        # Preprocess the image
        image = preprocess_image(image_file)
        
        # Make prediction
        prediction = model.predict(image)
        
        # If you're using classification, the result could be the index of the max prediction
        predicted_class = np.argmax(prediction, axis=1)[0]
        
        # If your model gives labels, you can map the index to class names
        class_names = ["A", "B", "C", "D"]  # Replace with actual class names
        predicted_label = class_names[predicted_class]
        
        return jsonify({"prediction": predicted_label})
    
    except Exception as e:
        return jsonify({"error": f"Error processing the image: {str(e)}"}), 500


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

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Missing required fields"}), 400

    if collection.find_one({"username": username}) is not None:
        return jsonify({"error": "Username already taken"}), 400

    hashed_password = hash_password(password)
    user = {
        "username": username,
        "password": hashed_password.decode("utf-8"),
        "level": 0,
        "streak":0,
        "power": 0,
        "health": 0,
        "experience": 0,
        "dexterity": 0
    }
    collection.insert_one(user)

    # Create a JWT token upon successful registration
    access_token = create_access_token(identity=username)

    return jsonify({"message": "User registered successfully", "token": access_token}), 201

@app.route('/login', methods=['POST'])
def get_user():
    # Get the username from the request arguments
    data = request.get_json()

    username = data.get("username")
    inputted_password = data.get("password")

    print(username)
    print(inputted_password)

    user = collection.find_one({"username": username})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Query the database for the user with the inputted username

    correct_password = user["password"].encode("utf-8")

    if user and verify_password(inputted_password, correct_password):
        access_token = create_access_token(identity=username)
        return jsonify({"token": access_token}), 200
    else:
        return jsonify({"error": "Invalid password"}), 401


@app.route("/save_boss", methods=["POST"])
@jwt_required()
def save_boss():
    users = db["users"]
    bosses = db["bosses"]
    data = request.get_json()
    boss_name = data.get("Name")

    # Get username from JWT token
    username = get_jwt_identity()

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


@app.route("/leaderboard",methods=["GET"])
def get_leaderboard():
    users = db["users"].find()
    player_levels = []

    for user in users:
        player_levels.append(user.get("level"))

    top_3_levels = sorted(player_levels, reverse=True)[:3]

    leaderboard = []

    for value in top_3_levels:
        current_user = db["users"].find_one({"level":value}).get("username")
        leaderboard.append([current_user,value])

    print(leaderboard)

    return "True"


if __name__ == "__main__":
    app.run(host="10.40.144.249", port=5000, debug=True)




