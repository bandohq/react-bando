import Mexico from '../../assets/Mexico.svg';
import Currency from '../../assets/Mexico-01.svg';
import Polygon from '../../assets/networks/polygon.png';
import Arbitrum from '../../assets/networks/arbitrum.png';
import Optimism from '../../assets/networks/optimism.png';
import Ethereum from '../../assets/networks/ethereum.png';

import WETH from '../../assets/chains/weth.png';
import Usdc from '../../assets/chains/usdc.png';
import Usdt from '../../assets/chains/usdt.png';
import MATIC from '../../assets/chains/matic.png';
import ETH from '../../assets/chains/eth.png';
import BNB from '../../assets/chains/bnb.png';

import CurrencyImg from '@components/CurrencyImg';

export const sendCurrency = [
  {
    label: 'MXN',
    value: 'MXN',
    startComponent: <CurrencyImg src={Currency} sx={{ width: 32, height: 32 }} />,
  },
  {
    label: 'CO (muy pronto)',
    value: 'CO',
    startComponent: <CurrencyImg src={Currency} sx={{ width: 32, height: 32 }} />,
    disabled: true,
  },
  {
    label: 'ARS (muy pronto)',
    value: 'ARS',
    startComponent: <CurrencyImg src={Currency} sx={{ width: 32, height: 32 }} />,
    disabled: true,
  },
];

export const depositCurrency = [
  {
    label: 'USDC',
    value: 'USDC',
    startComponent: <CurrencyImg src={Usdc} />,
  },
  {
    label: 'USDT',
    value: 'USDT',
    startComponent: <CurrencyImg src={Usdt} />,
  },
];

export const currencyImg = {
  USDC: <CurrencyImg src={Usdc} />,
  USDT: <CurrencyImg src={Usdt} />,
  MXN: <CurrencyImg src={Currency} />,
  ARB: <CurrencyImg src={Arbitrum} />,
  MATIC: <CurrencyImg src={MATIC} />,
  WETH: <CurrencyImg src={WETH} />,
  ETH: <CurrencyImg src={ETH} />,
  BNB: <CurrencyImg src={BNB} />,
  OPTIMISM: <CurrencyImg src={Optimism} />,
};

export const currencyImgPath = {
  USDC: Usdc,
  USDT: Usdt,
  MXN: Mexico,
};

export const currencyImgPathV2 = {
  MXN: Mexico,
};

export const currencyToken = {
  ARBITRUM: 'ARB',
  POLYGON: 'MATIC',
  MXN: 'MXN',
  USDC: 'USDC',
};

export const networkImg = {
  POLYGON: Polygon,
  ETHEREUM: Ethereum,
};

export default {
  networkImg,
  currencyImg,
  sendCurrency,
  depositCurrency,
  currencyToken,
};
