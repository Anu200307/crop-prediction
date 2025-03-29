FROM python:3.9-slim

WORKDIR /app

# Copy requirements first
COPY requirements.txt .

# Install required packages
RUN pip install --no-cache-dir numpy==1.22.4 scikit-learn==1.3.0 flask==2.3.3 gunicorn==21.2.0

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["python", "app.py"] 