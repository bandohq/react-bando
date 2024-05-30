import Mexico from '../../assets/Mexico-01.svg';

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
      {
        label: 'ETH',
        value: 'ETH',
        img: ETH,
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
    enabled: true,
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
    label: 'Binance Smart Chain',
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

export const networkCurrencyInfo = {
  pol: {
    label: 'Polygon',
    img: Polygon,
  },
  arb: {
    label: 'Arbitrum',
    img: Arbitrum,
  },
  op: {
    label: 'Optimism',
    img: Optimism,
  },
  bas: {
    label: 'Base',
    img: Base,
  },
  scl: {
    label: 'Scroll',
    img: Scroll,
  },
  bsc: {
    label: 'Binance ',
    img: Binance,
  },
  mxn: {
    label: 'MXN',
    img: Mexico,
  },
  eth: {
    label: 'Ethereum',
    img: Ethereum,
  },
  usdc: {
    label: 'USDC',
    img: USDC,
  },
  usdt: {
    label: 'USDT',
    img: USDT,
  },
  bnb: {
    label: 'BNB',
    img: BNB,
  },
  weth: {
    label: 'WETH',
    img: WETH,
  },
  matic: {
    label: 'MATIC',
    img: MATIC,
  },
} as { [key: string]: { label: string; img: string } };

export const networks = Object.keys(networkOptions);
export const networksOffRamp = Object.keys(networkOptionsOffRamp);

export default networkOptions;
