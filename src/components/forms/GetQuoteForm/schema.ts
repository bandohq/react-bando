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
  operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
  baseAmount: yup
    .number()
    .typeError('') // avoid error message when form input id empty
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) => schema.min(20, 'validation.onMinAmount'),
      otherwise: (schema) => schema.min(2, 'validation.offMinAmount'),
    })
    .required(),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
  network: yup.string().required(),
});

export default schema;
