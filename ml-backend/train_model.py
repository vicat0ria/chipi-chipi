import os
import numpy as np
import pandas as pd
import cv2
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt

# Paths to the training and testing datasets
train_dir = 'train dataset'

# Image dimensions
img_size = 64

# Initialize lists to store images and labels
images = []
labels = []

# label_range = [chr(i) for i in range(ord('A'), ord('J'))]

# Load training images
for label in os.listdir(train_dir):
  # if label[0].upper() in label_range:
    label_path = os.path.join(train_dir, label)
    if os.path.isdir(label_path):
      for img_file in os.listdir(label_path):
          img_path = os.path.join(label_path, img_file)
          # Read, resize, and normalize imageS
          img = cv2.imread(img_path)
          if img is None:
              continue
          img = cv2.resize(img, (img_size, img_size))
          img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB) / 255.0  # Normalize
          images.append(img)
          labels.append(label)
# Convert lists to numpy arrays
labels = np.array(labels)
print('label conversion done')
images = np.array(images)
print('image conversion done')

# Map labels to numeric values
label_mapping = {label: idx for idx, label in enumerate(np.unique(labels))}
labels = np.array([label_mapping[label] for label in labels])

# One-hot encode labels
labels = to_categorical(labels, num_classes=len(label_mapping))

# Train-validation split
X_train, X_val, y_train, y_val = train_test_split(images, labels, test_size=0.2, random_state=42)

model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(img_size, img_size, 3)),
    MaxPooling2D((2, 2)),

    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),

    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),

    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(len(label_mapping), activation='softmax')
])

model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])

# Fit model
batch_size = 32
epochs = 5

history = model.fit(
    X_train, y_train,
    batch_size=batch_size,
    validation_data=(X_val, y_val),
    epochs=epochs
)
model.save('trained_model.h5')
