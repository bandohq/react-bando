import * as yup from 'yup';

export type SignInFormValues = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default schema;
