import CleanLayout from '@layouts/CleanLayout';
import MarkDownContainer from '@components/MarkDownContainer';

export default function Terms() {
  const markdown = `
**Términos y Condiciones de Uso de Bando**

**Aceptación**
Al registrarse y utilizar los servicios de Bando, usted acepta estos términos y condiciones, los cuales rigen nuestra relación con usted en relación a esta plataforma. Usted reconoce los riesgos asociados con las transacciones de criptoactivos y acepta que Bando actúa como un intermediario facilitando sus operaciones.

**Responsabilidades del Usuario**
Es su responsabilidad asegurarse de que los criptoactivos adquiridos a través de nuestra plataforma cumplan con la legislación aplicable. Bando no se responsabiliza por verificar la legalidad o legitimidad de los criptoactivos transaccionados.

**Cambios en los Términos**
Nos reservamos el derecho de modificar estos términos. Es su responsabilidad revisar periódicamente los cambios, que serán comunicados a través de nuestra plataforma y por correo electrónico.

**Registro y Uso de la Plataforma**
Para utilizar Bando, debe completar el proceso de registro y cumplir con nuestra política de KYC (Conozca a Su Cliente). Usted es responsable de mantener la seguridad de su cuenta y de todas las actividades que ocurran bajo su acceso.

**Funcionamiento de la Plataforma**
Bando se reserva el derecho de modificar, actualizar o discontinuar la plataforma según sea necesario. En caso de discontinuación, se notificará a los usuarios con anticipación.

**Servicios**
La plataforma permite la compra y venta de criptoactivos, y usted es responsable de la veracidad de las informaciones suministradas para las transacciones. Las operaciones no son reversibles una vez confirmadas.

**Soporte**
El soporte técnico está disponible para ayudar con el uso de la plataforma. No asumimos responsabilidad por problemas técnicos del usuario o por ataques cibernéticos que el usuario pueda sufrir.

**Propiedad Intelectual**
Los servicios de Bando están protegidos por derechos de propiedad intelectual y son de uso exclusivo de nuestros clientes de acuerdo con estos términos.

**Limitación de Responsabilidad**
Bando no será responsable por pérdidas derivadas del uso de la plataforma, por acciones del usuario que contravengan estos términos o por eventos fuera de nuestro control.

**Consideraciones Finales**
Puede cancelar su cuenta en cualquier momento. Algunos datos pueden ser retenidos según lo exija la ley. La relación entre las partes se rige por la ley de Islas Cayman, y cualquier disputa será resuelta en los tribunales de George Town.

**Consentimiento**
Al utilizar Bando, usted da su consentimiento a estos términos y a nuestras políticas de privacidad y KYC.`;
  return (
    <CleanLayout>
      <MarkDownContainer
        sx={{ width: '100%', maxWidth: '800px', height: 'fit-content' }}
        content={markdown}
      />
    </CleanLayout>
  );
}
