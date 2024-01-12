import Currency from '../../assets/currency.svg';
import Usdt from '../../assets/usdt.svg';
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
    startComponent: <CurrencyImg src={Usdt} />,
  },
];

export default {
  sendCurrency,
  depositCurrency,
};
