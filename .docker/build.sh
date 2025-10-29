#!/bin/bash

# Simple build script for GridCloud Landing
# No build arguments needed - all variables are set at runtime

set -e

echo "Building GridCloud Landing Docker image..."

# Build the image
docker build -t gridcloud-landing:latest -f .docker/Dockerfile .

echo "Build completed successfully!"
echo ""
echo "To run the container:"
echo "docker run -p 8080:80 gridcloud-landing:latest"
echo ""
echo "To run with custom environment variables:"
echo "docker run -p 8080:80 \\"
echo "  -e SMTP_HOST=smtp.example.com \\"
echo "  -e SMTP_PORT=587 \\"
echo "  -e SMTP_USER=user@example.com \\"
echo "  -e SMTP_PASS=password \\"
echo "  -e SMTP_TO=contact@gridcloud.com \\"
echo "  gridcloud-landing:latest"
