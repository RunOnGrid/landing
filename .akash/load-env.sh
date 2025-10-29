#!/bin/bash

# Load environment variables from .akash/.env if it exists
if [ -f ".akash/.env" ]; then
    echo "🔧 Loading environment from .akash/.env..."
    # Load only valid environment variables (key=value format)
    export $(grep -E '^[A-Z_]+=.*' .akash/.env | xargs)
    echo "✅ Environment loaded successfully!"
    echo "   AKASH_KEY_NAME: $AKASH_KEY_NAME"
    echo "   AKASH_WALLET_ADDRESS: $AKASH_WALLET_ADDRESS"
else
    echo "⚠️  No .akash/.env file found"
    echo "   Run ./setup-wallet.sh first to configure your wallet"
fi
