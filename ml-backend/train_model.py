from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Sample data (sentences & sentiment labels)
texts = ["I love this!", "This is terrible!", "Awesome work", "I hate this"]
labels = [1, 0, 1, 0]  # 1 = Positive, 0 = Negative

# Train model
vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(texts)
model = MultinomialNB()
model.fit(X_train, labels)

# Save model
with open("model.pkl", "wb") as f:
    pickle.dump((model, vectorizer), f)

print("Model trained and saved as model.pkl")
