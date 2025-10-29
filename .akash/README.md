# GridCloud Landing - Akash Network Deployment

Deploy the GridCloud Landing page on Akash Network's decentralized cloud.

## Prerequisites

1. **Install Akash CLI**
   
   **Option 1 - Download from GitHub releases (recommended):**
   - Go to: https://github.com/akash-network/node/releases
   - Download the appropriate binary for your OS
   - Add to PATH
   
   **Option 2 - Install script (if available):**
   ```bash
   curl -sSfL https://raw.githubusercontent.com/akash-network/node/master/install.sh | sh
   ```
   
   **Option 3 - Using Go:**
   ```bash
   go install github.com/akash-network/node/cmd/akash@latest
   ```

2. **Create/Import Wallet**
   ```bash
   # Create new wallet
   akash keys add your-wallet-name
   
   # Or import existing wallet
   akash keys add your-wallet-name --recover
   ```

3. **Fund Your Wallet**
   - Get AKT tokens from an exchange
   - Send to your wallet address: `akash keys show your-wallet-name -a 2>/dev/null | grep -E '^akash[0-9a-z]+$'`
   - Minimum ~5 AKT recommended for deployment

## Quick Deployment

1. **Set environment variables**
   ```bash
   export AKASH_KEY_NAME=your-wallet-name
   export AKASH_KEYRING_BACKEND=os
   ```

2. **Run deployment script**
   ```bash
   chmod +x .akash/deploy.sh
   ./.akash/deploy.sh
   ```

## Manual Deployment

1. **Create deployment**
   ```bash
   akash tx deployment create .akash/deploy.yaml \
     --from $AKASH_KEY_NAME \
     --node https://rpc.akashnet.net:443 \
     --chain-id akashnet-2 \
     --gas-prices="0.025uakt" \
     --gas="auto" \
     --gas-adjustment="1.15" \
     -y
   ```

2. **Check for bids**
   ```bash
   akash query market bid list \
     --owner $(akash keys show $AKASH_KEY_NAME -a 2>/dev/null | grep -E '^akash[0-9a-z]+$') \
     --node https://rpc.akashnet.net:443 \
     --chain-id akashnet-2
   ```

3. **Accept a bid (create lease)**
   ```bash
   akash tx market lease create \
     --owner $(akash keys show $AKASH_KEY_NAME -a 2>/dev/null | grep -E '^akash[0-9a-z]+$') \
     --dseq <DEPLOYMENT_SEQUENCE> \
     --gseq 1 \
     --oseq 1 \
     --provider <PROVIDER_ADDRESS> \
     --from $AKASH_KEY_NAME \
     --node https://rpc.akashnet.net:443 \
     --chain-id akashnet-2 \
     --gas-prices="0.025uakt" \
     --gas="auto" \
     --gas-adjustment="1.15" \
     -y
   ```

4. **Get service URL**
   ```bash
   akash provider lease-status \
     --node https://rpc.akashnet.net:443 \
     --from $AKASH_KEY_NAME \
     --dseq <DEPLOYMENT_SEQUENCE> \
     --gseq 1 \
     --oseq 1 \
     --provider <PROVIDER_ADDRESS>
   ```

## Configuration

### Resource Requirements
- **CPU**: 0.1 units (100 millicores)
- **Memory**: 128Mi
- **Storage**: 512Mi
- **Cost**: ~1000 uAKT per block (~$0.01-0.05/month)

### Environment Variables
The deployment supports runtime environment variables for SMTP configuration:

- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port
- `SMTP_SECURE`: Use TLS (true/false)
- `SMTP_USER`: SMTP username
- `SMTP_PASS`: SMTP password
- `SMTP_TO`: Email recipient for contact forms

### Custom Configuration
Edit `.akash/deploy.yaml` to:
- Change resource requirements
- Add environment variables
- Modify provider selection criteria
- Adjust pricing

## Troubleshooting

### Common Issues

1. **Insufficient funds**
   - Ensure wallet has at least 5 AKT
   - Check balance: `akash query bank balances $(akash keys show $AKASH_KEY_NAME -a 2>/dev/null | grep -E '^akash[0-9a-z]+$')`

2. **No bids received**
   - Wait 2-3 minutes for providers to respond
   - Try increasing the pricing in deploy.yaml

3. **Deployment failed**
   - Check deployment logs
   - Verify Docker image is accessible: `ghcr.io/runongrid/landing:latest`

### Useful Commands

```bash
# List deployments
akash query deployment list --owner $(akash keys show $AKASH_KEY_NAME -a 2>/dev/null | grep -E '^akash[0-9a-z]+$')

# Close deployment
akash tx deployment close --dseq <DSEQ> --from $AKASH_KEY_NAME

# Check provider status
akash provider status --provider <PROVIDER_ADDRESS>
```

## Support

- [Akash Network Documentation](https://docs.akash.network/)
- [Akash Discord](https://discord.akash.network/)
- [GridCloud Support](https://github.com/RunOnGrid/landing/issues)
