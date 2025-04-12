# Use the official Python image from Docker Hub
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install the dependencies listed in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn for production-ready serving of Flask app
RUN pip install gunicorn

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Command to run the app with Gunicorn, binding to 0.0.0.0 on port 8080
CMD ["gunicorn", "-b", "0.0.0.0:8080", "login:app"]
