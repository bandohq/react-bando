import Polygon from '../../assets/networks/polygon.png';
import Arbitrum from '../../assets/networks/arbitrum.png';
import Optimism from '../../assets/networks/optimism.png';
import Base from '../../assets/networks/base.png';
import Scroll from '../../assets/networks/scroll.png';
import Binance from '../../assets/networks/binance-smart-chain.png';

import ARB from '../../assets/chains/arbitrum.png';
import WETH from '../../assets/chains/weth.png';
import USDC from '../../assets/chains/usdc.png';
import USDT from '../../assets/chains/usdt.png';
import MATIC from '../../assets/chains/matic.png';
import ETH from '../../assets/chains/eth.png';
import OP from '../../assets/chains/optimism.png';
import BNB from '../../assets/chains/bnb.png';

export type NetworkOption = Record<
  string,
  {
    label: string;
    value: string;
    img: string;
    chains: {
      label: string;
      value: string;
      img: string;
    }[];
  }
>;

const networkOptions: NetworkOption = {
  pol: {
    label: 'Polygon',
    value: 'pol',
    img: Polygon,
    chains: [
      {
        label: 'WETH',
        value: 'weth',
        img: WETH,
      },
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
        img: USDT,
      },
      {
        label: 'MATIC',
        value: 'matic',
        img: MATIC,
      },
    ],
  },
  arb: {
    label: 'Arbitrum',
    value: 'arb',
    img: Arbitrum,
    chains: [
      {
        label: 'ARB',
        value: 'arb',
        img: ARB,
      },
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
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
    chains: [
      {
        label: 'ETH',
        value: 'eth',
        img: ETH,
      },
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
        img: USDT,
      },
      {
        label: 'OP',
        value: 'op',
        img: OP,
      },
    ],
  },
  bas: {
    label: 'Base',
    value: 'bas',
    img: Base,
    chains: [
      {
        label: 'ETH',
        value: 'eth',
        img: ETH,
      },
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
        img: USDT,
      },
    ],
  },
  scl: {
    label: 'Scroll',
    value: 'scl',
    img: Scroll,
    chains: [
      {
        label: 'ETH',
        value: 'eth',
        img: ETH,
      },
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
        img: USDT,
      },
    ],
  },
  bsc: {
    label: 'Binance ',
    value: 'bsc',
    img: Binance,
    chains: [
      {
        label: 'BNB',
        value: 'bnb',
        img: BNB,
      },
      {
        label: 'WETH',
        value: 'weth',
        img: WETH,
      },
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
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
    chains: [
      {
        label: 'USDC',
        value: 'usdc',
        img: USDC,
      },
      {
        label: 'USDT',
        value: 'usdt',
        img: USDT,
      },
    ],
  },
} as const;

export const networks = Object.keys(networkOptions);
export const networksOffRamp = Object.keys(networkOptionsOffRamp);

export default networkOptions;
