import * as yup from 'yup';
import { OperationType } from '@hooks/useTransaction/requests';
import i18n from '@translations/index';

export type GetQuoteFormValues = {
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  operationType: OperationType;
  network: string;
};

const schema = yup.object().shape({
  operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
  baseAmount: yup.number()
    .typeError(i18n.t('validation.invalidAmount'))
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) => schema.min(20, i18n.t('form.validation.minAmount', { amount: 20 })),
      otherwise: (schema) => schema.min(2, i18n.t('form.validation.minAmount', { amount: 2 })),
    }).required(),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
  network: yup.string().required(),
});

export default schema;
