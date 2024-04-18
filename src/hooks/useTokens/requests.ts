import axios from 'axios';

type Token = {
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
  count: number;
  next?: string;
  previous?: string;
  tokens?: Token[];
};
type GetTokensRequest = (endpoint: string) => Promise<TokenResponse>;

export const getTokens: GetTokensRequest = (endpoint) =>
  axios.get(endpoint).then(({ data }) => {
    return {
      count: data?.count,
      next: data?.next,
      previous: data?.previous,
      tokens: (data?.results ?? []).map((token: Record<string, unknown>) => ({
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
        minAllowance: token?.min_allowance,
        maxAllowance: token?.max_allowance,
      })),
    };
  });
