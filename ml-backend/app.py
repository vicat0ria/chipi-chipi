from flask import Flask, request, jsonify
import pickle
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import base64

model = load_model('trained_model.h5')
label_mapping = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}

app = Flask(__name__)

# Load trained model
with open("model.pkl", "rb") as f:
    model, vectorizer = pickle.load(f)

@app.route("/")
def home():
    return "Flask is running!"

@app.route("/temp", methods=["POST"])
def test():
    return "success"

@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.json:
        return jsonify({"error": "No image provided"}), 400

    image_base64 = request.json['image']
    image_data = base64.b64decode(base64_string)
    with open(output_path, 'wb') as file:
        file.write(image_data)
    image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    # Preprocess the image
    image = cv2.resize(image, (64, 64))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) / 255.0 
    image_array = np.expand_dims(image, axis=0)

    # Predict using CNN
    prediction = model.predict(image_array)
    predicted_class = np.argmax(prediction, axis=1)[0]

    return jsonify({"prediction": predicted_class})



if __name__ == "__main__":
    app.run(host="10.40.106.51", port=5000, debug=True)
