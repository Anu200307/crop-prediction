# Crop Prediction System

A modern web application that uses machine learning to predict the most suitable crop based on soil and environmental parameters.

## Features

- Interactive UI with responsive design
- Dark/Light mode toggle
- Input validation for all parameters
- Real-time crop prediction using a Random Forest model
- Displays model performance metrics
- Mobile-friendly interface

## Prerequisites

- Python 3.7+
- Flask
- NumPy
- scikit-learn
- joblib

## Installation

### Option 1: Standard Installation

1. Clone the repository:

```bash
git clone https://github.com/Anu200307/crop-prediction.git
cd crop-prediction
```

2. Create a virtual environment (optional but recommended):

```bash
python -m venv venv
```

3. Activate the virtual environment:

   - On Windows:

   ```bash
   venv\Scripts\activate
   ```

   - On macOS/Linux:

   ```bash
   source venv/bin/activate
   ```

4. Install the required packages:

```bash
pip install -r requirements.txt
```

### Option 2: Docker Installation

If you have Docker installed, you can run the application using Docker:

1. Clone the repository:

```bash
git clone https://github.com/Anu200307/crop-prediction.git
cd crop-prediction
```

2. Build and run the Docker container:

   - On Windows:

   ```bash
   build_and_run.bat
   ```

   - On macOS/Linux:

   ```bash
   chmod +x build_and_run.sh
   ./build_and_run.sh
   ```

   Or using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the application at:

```
http://localhost:8080/
```

## Usage

1. Start the Flask server (if not using Docker):

```bash
python app.py
```

2. Open your web browser and navigate to:

```
http://127.0.0.1:5000/
```

3. Enter the soil and environmental parameters:

   - Nitrogen (N) content: 0-300
   - Phosphorus (P) content: 0-300
   - Potassium (K) content: 0-300
   - Temperature: 0-50°C
   - Humidity: 0-100%
   - pH Value: 0-14
   - Rainfall: 0-500mm

4. Click the "Predict Crop" button to get the recommended crop.

## Model Performance

The Random Forest model used in this application achieves an overall accuracy of 96% across 22 different crop types. The detailed classification metrics are available in the "Model Performance" section of the web application.

## Supported Crops

Apple, Banana, Blackgram, Chickpea, Coconut, Coffee, Cotton, Grapes, Jute, Kidneybeans, Lentil, Maize, Mango, Mothbeans, Mungbean, Muskmelon, Orange, Papaya, Pigeonpeas, Pomegranate, Rice, Watermelon

## Interactive Farm Scene

The application features a simple wheat field visualization in the hero section created using CSS animations:

- Realistic wheat stalks swaying gently in the wind
- Day/night cycle with sun and moon that change with theme toggle
- Randomized movement timing for natural-looking motion
- Simple and focused design that highlights agricultural themes
- Adaptive styling that changes with light/dark mode

This focused animation keeps the interface clean while providing a visual representation of what the application helps users accomplish.

## Docker Hub Image

A pre-built Docker image is available on Docker Hub:

```bash
docker pull anubarik/crop-prediction-final:latest
docker run -p 8080:5000 anubarik/crop-prediction-final:latest
```

Then access the application at http://localhost:8080/

## License

This project is licensed under the MIT License - see the LICENSE file for details.
