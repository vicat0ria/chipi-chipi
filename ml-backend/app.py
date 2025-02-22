from flask import Flask, request, jsonify
import pickle

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

if __name__ == "__main__":
    app.run(host="10.40.106.51", port=5000, debug=True)
