import axios from 'axios';

export type Network = {
  name: string;
  key: string;
  logoUrl: string;
  chainId: number;
  rpcUrl: string;
  explorerUrl: string;
  isTestnet: boolean;
  networkType: string;
  isActive: boolean;
};

type TokenResponse = Network[];
type GetNetworksRequest = (endpoint: string) => Promise<TokenResponse>;

export const getNetworks: GetNetworksRequest = (endpoint) =>
  axios.get(endpoint).then(({ data }) => {
    return (data ?? []).map((network: Record<string, unknown>) => ({
      name: network.name,
      key: network.key,
      logoUrl: network.logo_url,
      chainId: network.chain_id,
      rpcUrl: network.rpc_url,
      explorerUrl: network.explorer_url,
      isTestnet: network.is_testnet,
      networkType: network.network_type,
      isActive: network.is_active,
    }));
  });
