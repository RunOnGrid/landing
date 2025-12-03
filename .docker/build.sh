#!/bin/bash

# Simple build script for GridCloud Landing
# No build arguments needed - all variables are set at runtime

set -e

echo "Building GridCloud Landing Docker image..."

# Build the image
docker build -t gridcloud-landing:latest -f .docker/Dockerfile .

echo "Build completed successfully!"

# Tag for GitHub Container Registry
echo "Tagging image for GitHub Container Registry..."
docker tag gridcloud-landing:latest ghcr.io/runongrid/landing:latest

# Push to GitHub Container Registry
echo "Pushing to GitHub Container Registry..."
docker tag gridcloud-landing:latest ghcr.io/runongrid/landing:latest

echo ""
echo "✅ Image published to: ghcr.io/runongrid/landing:latest"
echo ""
echo "To run the container:"
echo "docker run -p 8080:80 ghcr.io/runongrid/landing:latest"
echo ""
echo "To run with custom environment variables:"
echo "docker run -p 8080:80 \\"
echo "  -e SMTP_HOST=smtp.example.com \\"
echo "  -e SMTP_PORT=587 \\"
echo "  -e SMTP_USER=user@example.com \\"
echo "  -e SMTP_PASS=password \\"
echo "  -e SMTP_TO=contact@gridcloud.com \\"
echo "  ghcr.io/runongrid/landing:latest"
