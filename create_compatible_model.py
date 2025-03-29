import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier

# Define the crop classes
crop_classes = [
    'apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton',
    'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans',
    'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas', 'pomegranate',
    'rice', 'watermelon'
]

# Create a synthetic dataset
np.random.seed(42)
n_samples = 2200  # 100 samples per class
X = np.random.rand(n_samples, 7) * 300  # Random values between 0 and 300

# Scale down some columns to realistic ranges
X[:, 3] = X[:, 3] * 50 / 300  # Temperature: 0-50
X[:, 4] = X[:, 4] * 100 / 300  # Humidity: 0-100
X[:, 5] = X[:, 5] * 14 / 300   # pH: 0-14
X[:, 6] = X[:, 6] * 500 / 300  # Rainfall: 0-500

# Generate target classes by dividing the data evenly
y = []
for i in range(22):
    crop = crop_classes[i]
    y.extend([crop] * 100)

# Create and train a random forest classifier
model = RandomForestClassifier(n_estimators=50, random_state=42)
model.fit(X, y)

# Test the model with some sample inputs
test_inputs = [
    [90, 42, 43, 20.87, 82.00, 6.50, 202.93],  # Should predict something
    [20, 30, 10, 25.00, 70.00, 7.00, 150.00],  # Different input
]

for input_data in test_inputs:
    prediction = model.predict(np.array([input_data]))[0]
    print(f"Input: {input_data} -> Predicted crop: {prediction}")

# Save the model
joblib.dump(model, 'rf_model_compatible.joblib')
print("Model saved as 'rf_model_compatible.joblib'") 