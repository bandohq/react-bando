import * as yup from 'yup';
import { OperationType } from '@hooks/useTransaction/requests';
import { Network } from '@hooks/useNetworks/requests';
import { Token } from '@hooks/useTokens/requests';

export type GetQuoteFormValues = {
  operationType: OperationType;
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  network: string;
};

export type GetQuoteFormValuesV2 = GetQuoteFormValues & {
  networkObj: Partial<Network>;
  tokenObj: Partial<Token>;
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
      then: (schema) => schema.max(500000, 'El monto máximo es de $500,000 MXN'),
      otherwise: (schema) => schema.max(10000, 'El monto máximo es de $10,000 USD'),
    })
    .required(),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
  network: yup.string().required(),
});

export const schemaV2 = schema.shape({
  networkObj: yup.object().required(),
  tokenObj: yup.object().required(),
});

export default schema;
