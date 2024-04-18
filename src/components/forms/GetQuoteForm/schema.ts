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
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) => schema.max(500000, 'EL monto máximo es de $500,000 MXN'),
      otherwise: (schema) => schema.max(10000, 'El monto máximo es de $10,000 USD'),
    })
    .required(),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
  network: yup.string().required(),
});

export default schema;
