import * as yup from 'yup';
import { isAddress } from 'web3-validator';

export type ConfirmRampFormValues = {
  operationType: 'deposit' | 'withdraw';
  address?: string;
  firstName?: string;
  lastName?: string;
  clabe?: string;
};

const schema = yup.object().shape({
  operationType: yup.string().oneOf(['deposit', 'withdraw']).required(),
  address: yup.string().when(['operationType'], {
    is: 'deposit',
    then: (schema) =>
      schema
        .test(
          'is-valid-address',
          () => 'La dirección es incorrecta',
          (value) => isAddress(value ?? ''),
        )
        .required(),
    otherwise: (schema) => schema.optional(),
  }),
  firstName: yup.string().when(['operationType'], {
    is: 'withdraw',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  lastName: yup.string().when(['operationType'], {
    is: 'withdraw',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.optional(),
  }),
  clabe: yup
    .string()
    .min(18)
    .max(18)
    .when(['operationType'], {
      is: 'withdraw',
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.optional(),
    }),
});

export default schema;
