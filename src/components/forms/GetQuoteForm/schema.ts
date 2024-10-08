import * as yup from 'yup';
import { OperationType } from '@hooks/useTransaction/requests';
import networksOnRamp, {
  networks,
  networkOptionsOffRamp,
  networksOffRamp,
} from '@config/constants/networks';
import { sendCurrency } from '@config/constants/currencies';
import i18n from 'translations';
import { Network } from '@hooks/useNetworks/requests';
import { Token } from '@hooks/useTokens/requests';
import { TFunction } from 'i18next';

export type GetQuoteFormValues = {
  operationType: OperationType;
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  network: string;
};

const validCurrencies = sendCurrency.map((currency) => currency.value);

const schema = yup.object().shape({
  operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
  baseAmount: yup
    .number()
    .typeError(i18n.t('form.validation.invalid'))
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) =>
        schema
          .min(100, i18n.t('en.form.validation.onMinAmount'))
          .max(500000, i18n.t('en.form.validation.onMaxAmount')),
      otherwise: (schema) =>
        schema
          .min(5, 'El monto mínimo es de $5.00 USD')
          .max(10000, 'El monto máximo es de $10,000 USD'),
    })
    .required(),
  baseCurrency: yup
    .string()
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) => schema.oneOf(validCurrencies, 'Por favor selecciona una moneda válida'),
      otherwise: (schema) =>
        schema.when('network', ([network], schema) => {
          const validChains = networkOptionsOffRamp[network]?.chains?.map((chain) => chain.value);
          return schema.oneOf(validChains, 'Por favor selecciona un chain válido');
        }),
    })
    .required(),
  quoteCurrency: yup
    .string()
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) =>
        schema.when('network', ([network], schema) => {
          const validChains = networksOnRamp[network]?.chains?.map((chain) => chain.value);
          return schema.oneOf(validChains, 'Por favor selecciona un chain válido');
        }),
      otherwise: (schema) =>
        schema.oneOf(validCurrencies, 'Por favor selecciona una moneda válida'),
    })
    .required(),
  network: yup
    .string()
    .required()
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) => schema.oneOf(networks, 'Por favor selecciona una red válida'),
      otherwise: (schema) => schema.oneOf(networksOffRamp, 'Por favor selecciona una red válida'),
    }),
});

export type GetQuoteFormValuesV2 = {
  operationType: OperationType;
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  networkObj: Partial<Network>;
  tokenObj: Partial<Token>;
};

export const schemaV2 = (t: TFunction<'form', undefined>) =>
  yup.object().shape({
    operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
    networkObj: yup.object().required(),
    tokenObj: yup.object().required(),
    baseAmount: yup
      .number()
      .typeError(t('validation.invalidAmount'))
      .when(['operationType'], {
        is: 'deposit',
        then: (schema) =>
          schema
            .min(100, () => t('validation.onMinAmount'))
            .max(500000, t('validation.onMaxAmount')),
        otherwise: (schema) =>
          schema.min(5, t('validation.offMinAmount')).max(10000, t('validation.offMaxAmount')),
      })
      .required(t('validation.invalidAmount')),
    quoteCurrency: yup.string().required(),
    baseCurrency: yup.string().required(),
  });

export default schema;
