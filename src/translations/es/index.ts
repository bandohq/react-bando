import landing from './landing';
import faq from './faq';
import transactionDetail from './transactionDetail';
import kycPoints from './kycPoints';
import userMenu from './userMenu';
import ramp from './ramp';
import transactions from './transactions';
import form from './form';
import quote from './quote';
import footer from './footer';

const kycForm = {
  rules: {
    phone: 'El télefono es requerido',
    phoneInvalid: 'Número de teléfono inválido',
    name: 'El nombre es requerido',
    lastName: 'El apellido es requerido',
    rfc: 'RFC es requerido',
    rfcInvalid: 'RFC Inválido',
    street: 'Tu calle, localidad, esquina, referencia, etc va en este campo.',
    neighborhood: 'La colonia o municipio en donde vives va en este campo.',
    state: 'El estado en donde vives va en este campo.',
    zip: 'El código postal de tu domicilio va en este campo.',
    country: 'El país es requerido.',
    document: 'El número de documento es requerido',
  },
};

export default {
  footer,
  landing,
  faq,
  ramp,
  transactionDetail,
  transactions,
  kycPoints,
  userMenu,
  quote,
  form,
  kycForm,
};
