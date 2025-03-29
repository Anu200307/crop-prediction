from flask import Flask, render_template, request, jsonify
import numpy as np
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# Define the crop classes
crop_classes = [
    'apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton',
    'grapes', 'jute', 'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans',
    'mungbean', 'muskmelon', 'orange', 'papaya', 'pigeonpeas', 'pomegranate',
    'rice', 'watermelon'
]

# Create and train the model at startup
def create_model():
    print("Creating model...")
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
    print("Model created successfully!")
    return model

# Initialize the model
model = create_model()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Extract features
        N = float(data['N'])
        P = float(data['P'])
        K = float(data['K'])
        temperature = float(data['temperature'])
        humidity = float(data['humidity'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])
        
        # Create input array for prediction
        input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Get prediction probabilities
        probabilities = model.predict_proba(input_data)[0]
        max_prob = max(probabilities) * 100
        
        return jsonify({
            'success': True, 
            'prediction': prediction,
            'confidence': round(max_prob, 2)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True) 