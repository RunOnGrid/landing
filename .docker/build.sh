#!/bin/bash

# Script para construir y subir la imagen a Docker Hub para Akash
# Uso: ./build.sh [VERSION] [--env-file .env]
# Ejemplo: ./build.sh 1.0
# Ejemplo: ./build.sh 1.0 --env-file .env.production
# NOTA: Usa la organización 'gridcloud' directamente

set -e

# Si no se pasa versión, usar "latest". Si se pasa, usar esa versión específica
if [ -z "$1" ]; then
    VERSION="latest"
    TAG_AS_LATEST=true
else
    VERSION="$1"
    TAG_AS_LATEST=false
fi

IMAGE_NAME="gridcloud/landing"
FULL_IMAGE_NAME="$IMAGE_NAME:$VERSION"

# Parse optional --env-file argument
ENV_FILE=""
if [ "$2" == "--env-file" ] && [ -n "$3" ]; then
    ENV_FILE="$3"
fi

echo "🐳 Construyendo y subiendo imagen a Docker Hub para Akash..."
echo "   Imagen: $FULL_IMAGE_NAME"
echo "   Plataforma: linux/amd64 (requerido para Akash)"
echo ""

# Load environment variables from file if provided
# Use an array to properly handle values with spaces
BUILD_ARGS_ARRAY=()

if [ -n "$ENV_FILE" ] && [ -f "$ENV_FILE" ]; then
    echo "📄 Cargando variables de entorno desde: $ENV_FILE"
    # Read .env file and convert to build args
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and lines that start with #
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        # Skip lines without =
        [[ ! "$line" =~ = ]] && continue
        # Split on first = only
        key="${line%%=*}"
        value="${line#*=}"
        # Trim whitespace from key
        key=$(echo "$key" | xargs)
        # Skip if key is empty after trimming
        [[ -z "$key" ]] && continue
        # Remove inline comments (everything after # that's not in quotes)
        value=$(echo "$value" | sed 's/[[:space:]]*#.*$//')
        # Trim whitespace from value
        value=$(echo "$value" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
        # Remove surrounding quotes if present
        if [[ "$value" =~ ^\".*\"$ ]] || [[ "$value" =~ ^\'.*\'$ ]]; then
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
        fi
        # Skip if value is empty
        [[ -z "$value" ]] && continue
        # Add as build arg to array
        BUILD_ARGS_ARRAY+=("--build-arg" "$key=$value")
        echo "   ✓ Agregado: $key"
    done < "$ENV_FILE"
elif [ -f ".env" ]; then
    echo "📄 Cargando variables de entorno desde: .env"
    while IFS= read -r line || [ -n "$line" ]; do
        # Skip empty lines and lines that start with #
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        # Skip lines without =
        [[ ! "$line" =~ = ]] && continue
        # Split on first = only
        key="${line%%=*}"
        value="${line#*=}"
        # Trim whitespace from key
        key=$(echo "$key" | xargs)
        # Skip if key is empty after trimming
        [[ -z "$key" ]] && continue
        # Remove inline comments
        value=$(echo "$value" | sed 's/[[:space:]]*#.*$//')
        # Trim whitespace from value
        value=$(echo "$value" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
        # Remove surrounding quotes if present
        if [[ "$value" =~ ^\".*\"$ ]] || [[ "$value" =~ ^\'.*\'$ ]]; then
            value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
        fi
        # Skip if value is empty
        [[ -z "$value" ]] && continue
        # Add as build arg to array
        BUILD_ARGS_ARRAY+=("--build-arg" "$key=$value")
        echo "   ✓ Agregado: $key"
    done < ".env"
else
    echo "⚠️  No se encontró archivo .env. Las variables deben estar en el entorno o pasarse manualmente."
    echo "   Puedes pasar variables individuales o usar --env-file"
fi

# Debug output
if [ ${#BUILD_ARGS_ARRAY[@]} -gt 0 ]; then
    echo "🔧 Build args preparados: ${#BUILD_ARGS_ARRAY[@]} elementos"
else
    echo "⚠️  No se encontraron build args"
fi

# Check Docker Hub login
if ! docker info | grep -q "Username"; then
    echo "⚠️  No estás logueado en Docker Hub"
    echo "Ejecutando: docker login"
    docker login
fi

echo "🔧 Configurando buildx..."
if ! docker buildx ls | grep -q "multiarch"; then
    docker buildx create --name multiarch --use 2>/dev/null || \
    docker buildx use default
fi

echo "🔨 Construyendo imagen para linux/amd64..."

# Build tags - only tag as latest if no version was specified
if [ "$TAG_AS_LATEST" = true ]; then
    echo "   Etiquetando como: $FULL_IMAGE_NAME (latest por defecto)"
else
    echo "   Etiquetando como: $FULL_IMAGE_NAME (versión específica: $VERSION)"
fi

if [ ${#BUILD_ARGS_ARRAY[@]} -gt 0 ]; then
    echo "✅ Construyendo con build args"
    if [ "$TAG_AS_LATEST" = true ]; then
        docker buildx build \
            --platform linux/amd64 \
            -t $FULL_IMAGE_NAME \
            -f .docker/Dockerfile \
            "${BUILD_ARGS_ARRAY[@]}" \
            --push \
            .
    else
        docker buildx build \
            --platform linux/amd64 \
            -t $FULL_IMAGE_NAME \
            -f .docker/Dockerfile \
            "${BUILD_ARGS_ARRAY[@]}" \
            --push \
            .
    fi
else
    echo "⚠️  Construyendo sin build args (puede que falten variables de entorno)"
    docker buildx build \
        --platform linux/amd64 \
        -t $FULL_IMAGE_NAME \
        -f .docker/Dockerfile \
        --push \
        .
fi

echo ""
echo "✅ Imagen construida y subida exitosamente!"
echo "   Docker Hub: docker.io/$FULL_IMAGE_NAME"
echo ""
echo "📝 Para usar en Akash SDL, usa:"
echo "   image: $FULL_IMAGE_NAME"
echo ""
echo "🔍 Verificar que la imagen tiene el manifest correcto:"
echo "   docker manifest inspect $FULL_IMAGE_NAME"
echo ""
echo "Para ejecutar el contenedor:"
echo "   docker run -p 8080:3000 docker.io/$FULL_IMAGE_NAME"
echo ""
echo "Para ejecutar con variables de entorno personalizadas:"
echo "   docker run -p 8080:3000 \\"
echo "     -e SMTP_HOST=smtp.example.com \\"
echo "     -e SMTP_PORT=587 \\"
echo "     -e SMTP_USER=user@example.com \\"
echo "     -e SMTP_PASS=password \\"
echo "     -e SMTP_TO=contact@gridcloud.com \\"
echo "     docker.io/$FULL_IMAGE_NAME"