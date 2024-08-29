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
  showNetworkList: never;
};

type NetworkResponse = Network[];
type GetNetworksRequest = (
  endpoint: string,
  direction: 'deposit' | 'withdraw',
) => Promise<NetworkResponse>;

export const getNetworks: GetNetworksRequest = (endpoint, direction = 'deposit') => {
  const dir = direction === 'deposit' ? 'ON' : 'OFF';
  const bnd = localStorage.getItem('bnd') || 'not_set';
  localStorage.setItem('direction', dir);
  return axios
    .get(endpoint, {
      params: { direction: dir },
      headers: { Authorization: '', Bnd: bnd },
    })
    .then(({ data }) => {
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
};
