@echo off
echo Building Docker image...
docker build -t crop-prediction-app .

echo Running Docker container...
docker run -p 5000:5000 --name crop-prediction-app crop-prediction-app

echo Container started. Access the application at http://localhost:5000 