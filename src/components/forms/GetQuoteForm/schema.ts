import * as yup from 'yup';

const schema = yup.object().shape({
  baseAmount: yup.number().required(),
  quoteCurrency: yup.string().required(),
  baseCurrency: yup.string().required(),
});

export default schema;
