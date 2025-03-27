from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow import keras
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
try:
    model = keras.models.load_model('crop_prediction_model.h5')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")

# Load the scaler (if you used one during training)
try:
    scaler = joblib.load('scaler.pkl')
    print("Scaler loaded successfully!")
except Exception as e:
    print(f"Error loading scaler: {e}")

# Crop mapping (adjust based on your model's output)
CROP_MAPPING = {
    0: 'Rice',
    1: 'Maize',
    2: 'Chickpea',
    3: 'Kidney Beans',
    4: 'Pigeon Peas',
    5: 'Moth Beans',
    6: 'Mung Bean',
    7: 'Blackgram',
    8: 'Lentil',
    9: 'Pomegranate',
    10: 'Banana',
    11: 'Mango',
    12: 'Grapes',
    13: 'Watermelon',
    14: 'Muskmelon',
    15: 'Apple'
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        data = request.json
        
        # Extract features in the order your model expects
        features = [
            float(data['nitrogen']),
            float(data['phosphorus']),
            float(data['potassium']),
            float(data['temperature']),
            float(data['humidity']),
            float(data['ph']),
            float(data['rainfall'])
        ]
        
        # Convert to numpy array
        input_features = np.array([features])
        
        # Scale features if you used scaling during training
        if scaler:
            input_features = scaler.transform(input_features)
        
        # Make prediction
        prediction = model.predict(input_features)
        
        # Get the crop with highest probability
        predicted_class = np.argmax(prediction, axis=1)[0]
        predicted_crop = CROP_MAPPING.get(predicted_class, 'Unknown Crop')
        
        # Get prediction probability
        confidence = float(np.max(prediction) * 100)
        
        return jsonify({
            'crop': predicted_crop,
            'confidence': confidence
        })
    
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)