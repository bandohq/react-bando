import * as yup from 'yup';
import { OperationType } from '@hooks/useTransaction/requests';

export type GetQuoteFormValues = {
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  operationType: OperationType;
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
