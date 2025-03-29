# Docker Setup and Usage Instructions

This document provides instructions for setting up Docker and running the Crop Prediction application in a Docker container.

## Installing Docker

### Windows

1. Download Docker Desktop for Windows from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/).
2. Follow the installation instructions.
3. Start Docker Desktop.

### macOS

1. Download Docker Desktop for Mac from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac/).
2. Follow the installation instructions.
3. Start Docker Desktop.

### Linux

1. Follow the installation instructions for your specific Linux distribution from the [Docker documentation](https://docs.docker.com/engine/install/).
2. After installation, start the Docker service:
   ```bash
   sudo systemctl start docker
   ```

## Building and Running the Docker Image

Once Docker is installed and running, you can build and run the Crop Prediction application using the following steps:

### Option 1: Using the Provided Scripts

#### Windows

```
.\build_and_run.bat
```

#### macOS/Linux

```bash
chmod +x build_and_run.sh
./build_and_run.sh
```

### Option 2: Using Docker Compose

```bash
docker-compose up --build
```

### Option 3: Manual Docker Commands

1. Build the Docker image:

   ```bash
   docker build -t crop-prediction-app .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 --name crop-prediction-app crop-prediction-app
   ```

## Accessing the Application

Once the container is running, you can access the application by opening a web browser and navigating to:

```
http://localhost:5000
```

## Stopping the Container

To stop the container, use one of the following methods:

### If using Docker Compose

```bash
docker-compose down
```

### If using Docker directly

```bash
docker stop crop-prediction-app
docker rm crop-prediction-app
```

## Troubleshooting

### Docker not starting

- Make sure Docker Desktop is running (Windows/macOS).
- For Linux, check if the service is running: `sudo systemctl status docker`.

### Container not starting

- Check if there's already a container with the same name: `docker ps -a`.
- If a container exists, remove it: `docker rm crop-prediction-app`.

### Application not accessible

- Verify the container is running: `docker ps`.
- Check the container logs: `docker logs crop-prediction-app`.
- Make sure port 5000 is not being used by another application on your system.
