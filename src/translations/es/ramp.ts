export default {
  address: 'Dirección de tu billetera',
  lastName: 'Apellidos',
  name: 'Nombres',
  clabe: 'Clabe',
  confirm: 'Confirmar',
  errors: {
    recipient: 'Esta cuenta ha sido rechazada por Bando. Intenta con otra.',
    forbidden:
      'Bando está en beta privado. Para poder ser de nuestros primeros usuarios envía un correo a soporte@bando.cool',
    txn: 'Hubo un error al procesar tu transacción. Por favor intenta de nuevo.',
    limit: `
      <h4>¡Has alcanzado tu límite mensual!</h4>
      <strong>¿Cómo hago para aumentar mi límite en Bando?</strong>
      </p>
        Con el nivel inicial, el límite de compra es de hasta $500 USD mensuales.
        Para aumentar tu límite hasta $9,999 USD al mes necesitas:
      </p>
      <ol>
        <li>Abre el chat de soporte de bando y solicita un aumento.</li>
        <li>Envía foto de tu INE (Frente y vuelta) o pasaporte</li>
        <li>Envía tu Comprobante de Domicilio</li>
        <li>Envía la dirección de tu billetera con la enviarás activos a Bando</li>
      </ol>
      <h6>Una vez con tus documentos, la verificación puede tardar hasta 24 horas.</h6>
    `,
    accountNames: 'El nombre de la cuenta no coincide con tu nombre registrado.',
  },
};
