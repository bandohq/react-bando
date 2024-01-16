import * as yup from 'yup';

export type GetQuoteFormValues = {
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  operationType: 'deposit' | 'withdraw';
  network: string;
};

const schema = yup.object().shape({
  baseAmount: yup.number().required(),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
  operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
  network: yup.string().required(),
});

export default schema;
