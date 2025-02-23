import os
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
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

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files or 'expected_result' not in request.form:
        return jsonify({"error": "Missing image or expected result"}), 400
    
    image_file = request.files['image']
    expected_result = request.form['expected_result'].strip().upper()  # Ensure uppercase for comparison

    try:
        # Preprocess the image
        image = preprocess_image(image_file)
        
        # Make prediction
        prediction = model.predict(image)
        
        # If classification, get the predicted class
        predicted_class = np.argmax(prediction, axis=1)[0]
        
        # Class names mapping
        class_names = ["A", "B", "C", "D"]  # Adjust based on model
        predicted_label = class_names[predicted_class]

        # Compare predicted label with expected result
        if predicted_label == expected_result:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False}), 400

    except Exception as e:
        return jsonify({"error": f"Error processing the image: {str(e)}"}), 500
    
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
    data = request.get_json()

    username = data.get("username")
    inputted_password = data.get("password")

    user = collection.find_one({"username": username})

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Query the database for the user with the inputted username

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
    app.run(host="10.40.106.51", port=5000, debug=True)