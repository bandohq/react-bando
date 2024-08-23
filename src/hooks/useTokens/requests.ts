import axios from 'axios';

export type Token = {
  id: number;
  name: string;
  symbol: string;
  key: string;
  address: string;
  decimals: number;
  isOnrampVerified: boolean;
  isOfframpVerified: boolean;
  isOnrampActive: boolean;
  isOfframpActive: boolean;
  imageUrl: string;
  minAllowance: number;
  maxAllowance: number;
};

type TokenResponse = {
  count?: number;
  next?: string;
  previous?: string;
  tokens?: Token[];
};

type GetTokensRequest = (endpoint: string) => Promise<TokenResponse>;

const mapToken = (token: Record<string, unknown>) => ({
  id: token?.id,
  name: token?.name,
  symbol: token?.symbol,
  key: token?.key,
  address: token?.address,
  decimals: token?.decimals,
  isOnrampVerified: token?.is_onramp_verified,
  isOfframpVerified: token?.is_offramp_verified,
  isOnrampActive: token?.is_onramp_active,
  isOfframpActive: token?.is_offramp_active,
  imageUrl: token?.image_url,
  minAllowance: parseFloat((token?.min_allowance as string) ?? '2'), // Set default of 2 when there is no min_allowance
  maxAllowance: parseFloat((token?.max_allowance as string) ?? '20'), // Set default of 20 when there is no max_allowance
});

export const getTokens: GetTokensRequest = (endpoint) => {
  const bnd = localStorage.getItem('bnd') || 'not_set';
  return axios
      .get(endpoint, {
        headers: {Authorization: '', 'X-bnd': bnd},
      })
      .then(({data}) => {
        const tokenArr = (data.length ? data : data.results) ?? [];
        return {
          count: data?.count,
          next: data?.next,
          previous: data?.previous,
          tokens: tokenArr.map((token: Record<string, unknown>) => mapToken(token)),
        };
      });
}
