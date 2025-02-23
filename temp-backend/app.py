from flask import Flask, request, jsonify
from db_methods import find_user_by_username  # Import the method
import pickle

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask is running!"

@app.route("/test", methods=["POST"])
def predict():
    try:
        # Get the username from the POST request
        data = request.get_json()
        username = data.get("username")
        
        if not username:
            return jsonify({"status": "error", "message": "Username is required"}), 400
        
        # Call the function to find the user by username
        user = find_user_by_username(username)

        if user:
            return jsonify({"status": "success", "user": user}), 200
        else:
            return jsonify({"status": "error", "message": "User not found"}), 404

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
