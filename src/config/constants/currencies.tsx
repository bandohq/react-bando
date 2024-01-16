import Currency from '../../assets/currency.svg';
// import Usdt from '../../assets/usdt.svg';
import Usdc from '../../assets/image-58_1.png';

import CurrencyImg from '@components/CurrencyImg';

export const sendCurrency = [
  {
    label: 'MXN',
    value: 'MXN',
    startComponent: <CurrencyImg src={Currency} />,
  },
];

export const depositCurrency = [
  {
    label: 'USDC',
    value: 'USDC',
    startComponent: <CurrencyImg src={Usdc} />,
  },
];

export const currencyImg = {
  USDC: <CurrencyImg src={Usdc} />,
  MXN: <CurrencyImg src={Currency} />,
};

export const currencyToken = {
  ARBITRUM: 'ARB',
  POLYGON: 'MATIC',
  MXN: 'MXN',
  USDC: 'USDC',
};

export default {
  currencyImg,
  sendCurrency,
  depositCurrency,
  currencyToken,
};
