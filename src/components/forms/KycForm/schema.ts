import { rfcRegex } from '@helpers/regexValidators';
import { isPhoneValid } from '@helpers/phoneValidation';
import { TFunction } from 'i18next';

import * as yup from 'yup';

export type KycFormValues = {
  type: string;
  firstName: string;
  lastName: string;
  phone: string;
  nationalIdNumber: string;
  acceptedNotifications?: boolean | undefined;
  address: {
    label?: yup.Maybe<string | undefined>;
    street: string;
    state: string;
    zip: string;
    country: string;
    neighborhood: string;
  };
  document: {
    type: string;
    number: string;
    country: string;
  };
};

const schema = (t: TFunction<'kycForm', undefined>) =>
  yup.object().shape({
    type: yup.string().required(),
    firstName: yup.string().required(t('rules.name')),
    lastName: yup.string().required(t('rules.lastName')),
    acceptedNotifications: yup.boolean(),
    phone: yup
      .string()
      .required(t('rules.phone'))
      .test('phone', t('rules.phoneInvalid'), (value) => isPhoneValid(value)),
    nationalIdNumber: yup
      .string()
      .required(t('rules.rfc'))
      .matches(rfcRegex, t('rules.rfcInvalid')),
    address: yup.object().shape({
      label: yup.string().notRequired(),
      street: yup.string().required(t('rules.street')),
      neighborhood: yup.string().required(t('rules.neighborhood')),
      state: yup.string().required(t('rules.state')),
      zip: yup.string().required(t('rules.zip')),
      country: yup.string().required(t('rules.country')),
    }),
    document: yup.object().shape({
      type: yup.string().required(),
      number: yup.string().required(t('rules.document')),
      country: yup.string().required(),
    }),
  });

export default schema;
