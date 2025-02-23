import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from different origins

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

if __name__ == "__main__":
    app.run(host="10.40.106.51", port=5000, debug=True)
