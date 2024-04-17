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
  baseAmount: yup.number().when(['operationType'], {
    is: 'deposit',
    then: (schema) =>
      schema
        .test(
          'is-valid-amount',
          'El monto mínimo es de $20 MXN',
          (value) => value !== undefined && value >= 20,
        )
        .required(),
    otherwise: (schema) =>
      schema
        .test(
          'is-valid-amount',
          'El monto mínimo es de $2 USD',
          (value) => value !== undefined && value >= 2,
        )
        .required(),
  }),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
  network: yup.string().required(),
});

export default schema;
