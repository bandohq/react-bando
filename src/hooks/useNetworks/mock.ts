export default [
  {
    name: 'Ethereum',
    key: 'eth',
    logo_url:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/ethereum.svg',
    chain_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    explorer_url: 'https://etherscan.io/',
    is_testnet: false,
    network_type: 'EVM',
    is_active: true,
  },
  {
    name: 'Arbitrum',
    key: 'arb',
    logo_url:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/arbitrum.svg',
    chain_id: 42161,
    rpc_url: 'https://arb1.arbitrum.io/rpc',
    explorer_url: 'https://arbiscan.io/',
    is_testnet: false,
    network_type: 'EVM',
    is_active: true,
  },
  {
    name: 'Polygon',
    key: 'pol',
    logo_url:
      'https://raw.githubusercontent.com/lifinance/types/main/src/assets/icons/chains/polygon.svg',
    chain_id: 137,
    rpc_url: 'https://polygon-rpc.com/',
    explorer_url: 'https://polygonscan.com/',
    is_testnet: false,
    network_type: 'EVM',
    is_active: true,
  },
];
