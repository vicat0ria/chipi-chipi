from flask import Flask, request, jsonify
import pickle
from tensorflow.keras.models import load_model
import numpy as np
import cv2

model = load_model('trained_model.h5')
label_mapping = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}

app = Flask(__name__)

# Load trained model
with open("model.pkl", "rb") as f:
    model, vectorizer = pickle.load(f)

@app.route("/")
def home():
    return "Flask is running!"


@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image_file = request.files['image']

    in_memory_image = image_file.read()
    image_array = np.asarray(bytearray(in_memory_image), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    
    if image is None:
        return jsonify({"error": "Invalid image format"}), 400
    
    image = cv2.resize(image, (64, 64))  
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) / 255.0 
    image_array = np.expand_dims(image, axis=0) 
    
    prediction = model.predict(image_array)
    predicted_class = np.argmax(prediction, axis=1)[0]

    predicted_label = label_mapping[predicted_class]

    return jsonify({"prediction": predicted_label})


if __name__ == "__main__":
    app.run(host="10.40.106.51", port=5000, debug=True)
