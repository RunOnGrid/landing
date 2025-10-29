#!/bin/bash

# GridCloud Landing - Akash Network Deployment Script
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
AKASH_CHAIN_ID="akashnet-2"
AKASH_NODE="https://rpc.akashnet.net:443"
DEPLOYMENT_FILE=".akash/deploy.yaml"

echo -e "${BLUE}🚀 GridCloud Landing - Akash Deployment${NC}"
echo "=================================="

# Load environment variables from .env file if it exists
if [ -f ".akash/.env" ]; then
    echo -e "${CYAN}🔧 Loading environment from .akash/.env...${NC}"
    # Load only valid environment variables (key=value format)
    export $(grep -E '^[A-Z_]+=.*' .akash/.env | xargs)
    echo -e "${GREEN}✅ Environment loaded: $AKASH_KEY_NAME${NC}"
fi

# Function to install Akash CLI
install_akash_cli() {
    echo -e "${YELLOW}📥 Installing Akash CLI...${NC}"
    
    # Detect OS and architecture
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    ARCH=$(uname -m)
    
    case $ARCH in
        x86_64) ARCH="amd64" ;;
        arm64|aarch64) ARCH="arm64" ;;
        *) echo -e "${RED}❌ Unsupported architecture: $ARCH${NC}"; exit 1 ;;
    esac
    
    # Get latest release version
    echo "🔍 Getting latest Akash version..."
    LATEST_VERSION=$(curl -s https://api.github.com/repos/akash-network/node/releases/latest | grep '"tag_name"' | cut -d'"' -f4)
    
    if [ -z "$LATEST_VERSION" ]; then
        echo -e "${RED}❌ Failed to get latest version${NC}"
        exit 1
    fi
    
    echo "📦 Latest version: $LATEST_VERSION"
    
    # Download URL
    DOWNLOAD_URL="https://github.com/akash-network/node/releases/download/${LATEST_VERSION}/akash_${LATEST_VERSION#v}_${OS}_${ARCH}.zip"
    
    # Create temp directory
    TEMP_DIR=$(mktemp -d)
    cd "$TEMP_DIR"
    
    echo "⬇️  Downloading: $DOWNLOAD_URL"
    curl -L -o akash.zip "$DOWNLOAD_URL"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Download failed${NC}"
        exit 1
    fi
    
    # Extract
    echo "📂 Extracting..."
    unzip -q akash.zip
    
    # Install to /usr/local/bin (requires sudo) or ~/bin
    if [ -w "/usr/local/bin" ]; then
        INSTALL_DIR="/usr/local/bin"
    else
        INSTALL_DIR="$HOME/bin"
        mkdir -p "$INSTALL_DIR"
        echo "export PATH=\"\$HOME/bin:\$PATH\"" >> ~/.bashrc
    fi
    
    echo "📁 Installing to $INSTALL_DIR..."
    mv akash "$INSTALL_DIR/"
    chmod +x "$INSTALL_DIR/akash"
    
    # Cleanup
    cd - > /dev/null
    rm -rf "$TEMP_DIR"
    
    echo -e "${GREEN}✅ Akash CLI installed successfully!${NC}"
    echo "Version: $($INSTALL_DIR/akash version)"
    
    # Update PATH for current session
    export PATH="$INSTALL_DIR:$PATH"
}

# Check if akash CLI is installed
if ! command -v akash &> /dev/null; then
    echo -e "${YELLOW}⚠️  Akash CLI not found${NC}"
    read -p "Do you want to install it automatically? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        install_akash_cli
    else
        echo -e "${RED}❌ Akash CLI is required. Install manually from:${NC}"
        echo "https://github.com/akash-network/node/releases"
        exit 1
    fi
fi

# Check if wallet is configured
if [ -z "$AKASH_KEY_NAME" ]; then
    echo -e "${YELLOW}⚠️  AKASH_KEY_NAME environment variable not set${NC}"
    echo "Please set your wallet key name:"
    echo "export AKASH_KEY_NAME=your-wallet-name"
    exit 1
fi

# Check if account has funds
echo -e "${BLUE}💰 Checking account balance...${NC}"
WALLET_ADDRESS=$(akash keys show $AKASH_KEY_NAME -a 2>/dev/null | grep -E '^akash[0-9a-z]+$' | head -1)
echo "Wallet address: $WALLET_ADDRESS"
BALANCE=$(akash query bank balances "$WALLET_ADDRESS" --node "$AKASH_NODE" --chain-id "$AKASH_CHAIN_ID")
echo "$BALANCE"

# Check certificate
echo -e "${YELLOW}🔐 Checking certificate...${NC}"
CERT_DIR="$HOME/.akash"
CERT_FILE="$CERT_DIR/${WALLET_ADDRESS}.pem"

if [ ! -f "$CERT_FILE" ]; then
    echo -e "${YELLOW}📜 Certificate not found. Please run: ./.akash/export-cert.sh first${NC}"
    echo "This will create and export the certificate for deployment."
    exit 1
else
    echo -e "${GREEN}✅ Certificate found and ready${NC}"
fi

# Check if GITHUB_PAT is set
if [ -z "$GITHUB_PAT" ]; then
    echo -e "${YELLOW}⚠️  GITHUB_PAT not set. Please add your GitHub Personal Access Token to .akash/.env${NC}"
    echo "GITHUB_PAT=your_github_pat_here"
    echo ""
    echo "This is required to pull the private Docker image from ghcr.io"
    exit 1
fi

# Create deployment
echo -e "${BLUE}📝 Creating deployment...${NC}"
GITHUB_PAT="$GITHUB_PAT" akash tx deployment create "$DEPLOYMENT_FILE" \
    --from "$AKASH_KEY_NAME" \
    --node "$AKASH_NODE" \
    --chain-id "$AKASH_CHAIN_ID" \
    --gas-prices="0.025uakt" \
    --gas="auto" \
    --gas-adjustment="1.15" \
    -y

echo -e "${GREEN}✅ Deployment created successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. Wait for bids: akash query market bid list --owner \$(akash keys show \"$AKASH_KEY_NAME\" -a 2>/dev/null | grep -E '^akash[0-9a-z]+$') --node \"$AKASH_NODE\" --chain-id \"$AKASH_CHAIN_ID\""
echo "2. Accept a bid: akash tx market lease create --owner \$(akash keys show \"$AKASH_KEY_NAME\" -a 2>/dev/null | grep -E '^akash[0-9a-z]+$') --dseq <DSEQ> --gseq 1 --oseq 1 --provider <PROVIDER> --from \"$AKASH_KEY_NAME\" --node \"$AKASH_NODE\" --chain-id \"$AKASH_CHAIN_ID\" --gas-prices=\"0.025uakt\" --gas=\"auto\" --gas-adjustment=\"1.15\" -y"
echo "3. Get lease status: akash provider lease-status --node \"$AKASH_NODE\" --from \"$AKASH_KEY_NAME\" --dseq <DSEQ> --gseq 1 --oseq 1 --provider <PROVIDER>"
echo ""
echo -e "${BLUE}🌐 Your GridCloud Landing will be available at the provider's URL once deployed!${NC}"
