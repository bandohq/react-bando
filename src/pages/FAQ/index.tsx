import CleanLayout from '@layouts/CleanLayout';
import MarkDownContainer from '@components/MarkDownContainer';

export default function FAQ() {
  const markdown = `
  # Preguntas Frecuentes

  ### **¿Qué es Bando?**
  
  Bando es una plataforma de criptomonedas que proporciona una manera sencilla y segura para que usuarios nuevos y experimentados compren, vendan y gestionen sus activos digitales.
  
  ### **¿Cómo empiezo a usar Bando?**
  
  Para comenzar, crea una cuenta en nuestra plataforma, completa el proceso de verificación de identidad (KYC), y podrás empezar a realizar transacciones de inmediato, tanto compra como venta de criptomonedas.
  
  ### **¿Es seguro comprar y vender en Bando?**
  
  Sí, la seguridad es nuestra máxima prioridad. Utilizamos tecnologías avanzadas de seguridad para proteger tus transacciones y mantener tu privacidad.
  
  ### **¿Puedo usar Bando en mi celular?**
  
  Sí, nuestra plataforma es accesible y optimizada para dispositivos móviles, permitiéndote usar Bando desde cualquier dispositivo
  
  ### **¿Bando custodia mis activos?**
  
  No, Bando no custodia tus activos. La plataforma facilita la compra y venta de criptomonedas, pero eres tú quien mantiene el control directo sobre tus activos digitales a través de tu cartera personal
  
  ### **¿Dónde puedo aprender sobre criptomonedas desde cero?**
  
  ¡Bando Academy es tu punto de partida ideal! Ofrecemos un curso completo para principiantes sobre criptomonedas en [Bando Academy](https://academy.bando.cool/)
  
  Allí, aprenderás todo lo básico, desde qué son las criptomonedas hasta cómo funcionan y cómo puedes comenzar a operar con ellas. 
  
  ### **¿Qué hago si tengo un problema o una pregunta?**
  
  Nuestro equipo de soporte está disponible para ayudarte con cualquier problema o duda. Puedes contactarnos enviando un correo electrónico a nuestro equipo de soporte al correo hola@bando.cool`;
  return (
    <CleanLayout>
      <MarkDownContainer
        sx={{ width: '100%', maxWidth: '800px', height: 'fit-content', margin: '0 auto' }}
        content={markdown}
      />
    </CleanLayout>
  );
}
