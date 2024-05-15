import Polygon from '../../assets/networks/polygon.png';
import Arbitrum from '../../assets/networks/arbitrum.png';
import Optimism from '../../assets/networks/optimism.png';
import Base from '../../assets/networks/base.png';
import Scroll from '../../assets/networks/scroll.png';
import Binance from '../../assets/networks/binance-smart-chain.png';
import Ethereum from '../../assets/networks/ethereum.png';

import WETH from '../../assets/chains/weth.png';
import USDC from '../../assets/chains/usdc.png';
import USDT from '../../assets/chains/usdt.png';
import MATIC from '../../assets/chains/matic.png';
import ETH from '../../assets/chains/eth.png';
import BNB from '../../assets/chains/bnb.png';

type NetworkOptionItem = {
  label: string;
  value: string;
  img: string;
};

export type NetworkOption = Record<
  string,
  NetworkOptionItem & {
    enabled: boolean;
    chains: NetworkOptionItem[];
  }
>;

const networkOptions: NetworkOption = {
  pol: {
    label: 'Polygon',
    value: 'pol',
    img: Polygon,
    enabled: true,
    chains: [
      {
        label: 'WETH',
        value: 'WETH',
        img: WETH,
      },
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
      {
        label: 'MATIC',
        value: 'MATIC',
        img: MATIC,
      },
    ],
  },
  arb: {
    label: 'Arbitrum',
    value: 'arb',
    img: Arbitrum,
    enabled: true,
    chains: [
      {
        label: 'ARB',
        value: 'ARB',
        img: Arbitrum,
      },
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
      {
        label: 'WETH',
        value: 'weth',
        img: WETH,
      },
    ],
  },
  op: {
    label: 'Optimism',
    value: 'op',
    img: Optimism,
    enabled: false,
    chains: [
      {
        label: 'ETH',
        value: 'ETH',
        img: ETH,
      },
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
      {
        label: 'OP',
        value: 'OP',
        img: Optimism,
      },
    ],
  },
  bas: {
    label: 'Base',
    value: 'bas',
    img: Base,
    enabled: false,
    chains: [
      {
        label: 'ETH',
        value: 'ETH',
        img: ETH,
      },
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
    ],
  },
  scl: {
    label: 'Scroll',
    value: 'scl',
    img: Scroll,
    enabled: false,
    chains: [
      {
        label: 'ETH',
        value: 'ETH',
        img: ETH,
      },
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
    ],
  },
  bsc: {
    label: 'Binance ',
    value: 'bsc',
    img: Binance,
    enabled: false,
    chains: [
      {
        label: 'BNB',
        value: 'BNB',
        img: BNB,
      },
      {
        label: 'WETH',
        value: 'WETH',
        img: WETH,
      },
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
    ],
  },
} as const;

export const networkOptionsOffRamp: NetworkOption = {
  pol: {
    label: 'Polygon',
    value: 'pol',
    img: Polygon,
    enabled: true,
    chains: [
      {
        label: 'USDC',
        value: 'USDC',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'USDT',
        img: USDT,
      },
    ],
  },
} as const;

export const networkInfo = Object.keys(networkOptions).reduce(
  (acc, key) => {
    acc[key as string] = {
      label: acc[key as string]?.label,
      img: acc[key as string]?.img,
    };
    return acc;
  },
  {} as { [key: string]: { label: string; img: string } },
);

export const networkCurrencyInfo = {
  ...networkInfo,
  mxn: {
    label: 'MXN',
    img: Ethereum,
  },
  eth: {
    label: 'Ethereum',
    img: Ethereum,
  },
} as { [key: string]: { label: string; img: string } };

export const networks = Object.keys(networkOptions);
export const networksOffRamp = Object.keys(networkOptionsOffRamp);

export default networkOptions;
