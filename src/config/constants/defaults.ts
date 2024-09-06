import { Network } from '@hooks/useNetworks/requests';
import { Token } from '@hooks/useTokens/requests';

export const defaultOnToken: Token = {
  id: 5655,
  key: 'usdc',
  name: 'USDC',
  symbol: 'USDC',
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  imageUrl:
    'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
  decimals: 6,
  isOfframpActive: false,
  isOnrampActive: true,
  isOfframpVerified: false,
  isOnrampVerified: true,
  maxAllowance: 1000000,
  minAllowance: 5,
};

// Base
export const defaultOnNetwork: Network = {
  key: 'bas',
  name: 'Base',
  logoUrl:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/base.svg',
  explorerUrl: 'https://basescan.org/',
  chainId: 8453,
  isActive: true,
  rpcUrl: 'https://rpc.basechain.net',
  isTestnet: false,
  networkType: 'EVM',
  showNetworkList: false as never,
};

export const defaultOffNetwork: Network = {
  key: 'pol',
  name: 'Polygon',
  logoUrl:
    'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
  explorerUrl: 'https://polygonscan.org/',
  chainId: 137,
  isActive: true,
  rpcUrl: 'https://rpc.basechain.net',
  isTestnet: false,
  networkType: 'EVM',
  showNetworkList: false as never,
};

export const defaultOffToken: Token = {
  id: 3436,
  key: 'usdc',
  name: 'USDC',
  symbol: 'USDC',
  address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
  imageUrl:
    'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
  decimals: 6,
  isOfframpActive: true,
  isOnrampActive: true,
  isOfframpVerified: true,
  isOnrampVerified: true,
  maxAllowance: 1000000,
  minAllowance: 5,
};
