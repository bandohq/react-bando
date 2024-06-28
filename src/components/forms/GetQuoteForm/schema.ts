import * as yup from 'yup';
import { OperationType } from '@hooks/useTransaction/requests';
import networksOnRamp, {
  networks,
  networkOptionsOffRamp,
  networksOffRamp,
} from '@config/constants/networks';
import { sendCurrency } from '@config/constants/currencies';

export type GetQuoteFormValues = {
  baseAmount: number;
  quoteCurrency: string;
  baseCurrency: string;
  operationType: OperationType;
  network: string;
};

const validCurrencies = sendCurrency.map((currency) => currency.value);

const schema = yup.object().shape({
  operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
  baseAmount: yup
    .number()
    .typeError('Introduce un monto válido')
    .when(['operationType'], {
      is: 'deposit',
      then: (schema) =>
        schema
          .min(100, 'El monto mínimo es de $100.00 MXN')
          .max(500000, 'El monto máximo es de $500,000 MXN'),
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

export default schema;
