#!/bin/bash

# Export certificate for GitHub Actions
set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔐 Exporting Akash Certificate for GitHub Actions${NC}"
echo "=================================================="

# Load environment
if [ -f ".akash/.env" ]; then
    export $(grep -E '^[A-Z_]+=.*' .akash/.env | xargs)
fi

WALLET_ADDRESS=$(akash keys show $AKASH_KEY_NAME -a 2>/dev/null | grep -E '^akash[0-9a-z]+$' | head -1)

echo -e "${YELLOW}📋 Certificate information:${NC}"
echo "Wallet: $AKASH_KEY_NAME"
echo "Address: $WALLET_ADDRESS"
echo ""

# Find certificate files
CERT_DIR="$HOME/.akash"
CERT_FILE="$CERT_DIR/${WALLET_ADDRESS}.pem"
KEY_FILE="$CERT_DIR/${WALLET_ADDRESS}.key"

if [ -f "$CERT_FILE" ] && [ -f "$KEY_FILE" ]; then
    echo -e "${GREEN}✅ Certificate files found${NC}"
    echo "Certificate: $CERT_FILE"
    echo "Private Key: $KEY_FILE"
    echo ""
    
    echo -e "${YELLOW}📄 Certificate content (for GitHub Secret):${NC}"
    echo "=================================="
    cat "$CERT_FILE"
    echo ""
    echo "=================================="
    
    echo -e "${YELLOW}🔑 Private Key content (for GitHub Secret):${NC}"
    echo "=================================="
    cat "$KEY_FILE"
    echo ""
    echo "=================================="
    
    echo -e "${BLUE}💡 GitHub Actions Setup:${NC}"
    echo "1. Copy the certificate content above to GitHub Secret: AKASH_CERT_PEM"
    echo "2. Copy the private key content above to GitHub Secret: AKASH_CERT_KEY"
    echo "3. Add wallet info to secrets:"
    echo "   - AKASH_KEY_NAME: $AKASH_KEY_NAME"
    echo "   - AKASH_WALLET_ADDRESS: $WALLET_ADDRESS"
    echo "   - AKASH_CHAIN_ID: akashnet-2"
    echo "   - AKASH_NODE: https://rpc.akashnet.net:443"
    
else
    echo -e "${YELLOW}⚠️  Certificate files not found. Generating...${NC}"
    
    # Generate certificate
    akash tx cert generate client --from "$AKASH_KEY_NAME" --overwrite -y
    
    # Publish to blockchain with higher gas
    akash tx cert publish client \
        --from "$AKASH_KEY_NAME" \
        --node "https://rpc.akashnet.net:443" \
        --chain-id "akashnet-2" \
        --gas-prices="0.025uakt" \
        --gas="200000" \
        -y
    
    echo -e "${GREEN}✅ Certificate created and published${NC}"
    echo "Run this script again to export the certificate files."
fi
