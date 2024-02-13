import { render, screen } from '@testing-library/react';
import Footer from '@components/Footer';

test('renders Footer component', () => {
  render(<Footer />);

  // Assert that the FooterLogo is rendered
  const footerLogo = screen.getByLabelText('Bando footer logo');
  expect(footerLogo).toBeInTheDocument();

  // Assert that the FooterLink for Preguntas Frecuentes is rendered
  const preguntasFrecuentesLink = screen.getByText('Preguntas Frecuentes');
  expect(preguntasFrecuentesLink).toBeInTheDocument();

  // Assert that the FooterLink for Bando Academy is rendered
  const bandoAcademyLink = screen.getByText('Bando Academy');
  expect(bandoAcademyLink).toBeInTheDocument();

  // Assert that the FooterLink for Política de Privacidad is rendered
  const politicaPrivacidadLink = screen.getByText('Política de Privacidad');
  expect(politicaPrivacidadLink).toBeInTheDocument();

  // Assert that the FooterLink for Términos y Condiciones is rendered
  const terminosCondicionesLink = screen.getByText('Términos y Condiciones');
  expect(terminosCondicionesLink).toBeInTheDocument();

  // Assert that the FooterLink for Contacto is rendered
  const contactoLink = screen.getByText('Contacto');
  expect(contactoLink).toBeInTheDocument();

  // Assert that the IconButton for Twitter is rendered
  const twitterIconButton = screen.getByLabelText('Twitter');
  expect(twitterIconButton).toBeInTheDocument();
});
