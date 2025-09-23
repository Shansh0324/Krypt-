# Environment Setup

## Required Environment Variables

Create a `.env` file in the `client` directory with the following variables:

```env
# Giphy API Key for GIF integration
VITE_GIPHY_API=your_giphy_api_key_here

# Contract Address (update after deployment)
VITE_CONTRACT_ADDRESS=0x4a686a373A431861C3FB6B4e180cA6589bb62888
```

## Getting a Giphy API Key

1. Go to [Giphy Developers](https://developers.giphy.com/)
2. Sign up for a free account
3. Create a new app
4. Copy your API key
5. Add it to your `.env` file

## Smart Contract Environment

Create a `.env` file in the `smart_contract` directory:

```env
# Alchemy API Key for Sepolia testnet
ALCHEMY_API_KEY=your_alchemy_api_key_here

# Private key of your wallet (for deployment)
PRIVATE_KEY=your_private_key_here

# Optional: Enable gas reporting
REPORT_GAS=true
```

## Getting an Alchemy API Key

1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up for a free account
3. Create a new app
4. Select Ethereum and Sepolia testnet
5. Copy your API key
