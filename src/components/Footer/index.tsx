import Box, { BoxProps } from '@mui/material/Box';
import { Grid, Link, Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import XIcon from '@mui/icons-material/X';
import Logo from '../../assets/logo.svg';

const FooterContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: theme.spacing(8),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  borderTop: '1px solid',
  borderColor: theme.palette.primary.main,
}));

const FooterLogo = styled('img')(() => ({
  width: '100%',
  maxWidth: '100px',
  height: 'auto',
  verticalAlign: 'middle',
  display: 'inline-block',
}));

const socialMediaLinks = {
  twitter: 'https://twitter.com/bando_cool_',
};

export default function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth={false} sx={{ maxWidth: '1200px', minHeight: '200px' }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <FooterLogo src={Logo} loading="lazy" alt="" aria-label="Bando footer logo" />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.main', fontWeight: 700 }}
              gutterBottom
            >
              PRODUCTO
            </Typography>
            <Link href="/faq" sx={{ color: 'ink.i900' }} display="block">
              Preguntas Frecuentes
            </Link>
            <Link
              sx={{ color: 'ink.i900' }}
              href="https://academy.bando.cool"
              target="_blank"
              display="block"
            >
              Bando Academy
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.main', fontWeight: 700 }}
              gutterBottom
            >
              NOSOTROS
            </Typography>
            <Link href="/terms" sx={{ color: 'ink.i900' }} display="block">
              Política de Privacidad
            </Link>
            <Link href="/terms" sx={{ color: 'ink.i900' }} display="block">
              Términos y Condiciones
            </Link>
            <Link href="mailto:hola@bando.cool" sx={{ color: 'ink.i900' }} display="block">
              Contacto
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.main', fontWeight: 700 }}
              gutterBottom
            >
              SIGUENOS
            </Typography>
            <IconButton
              aria-label="Twitter"
              target="_blank"
              component="a"
              href={socialMediaLinks.twitter}
            >
              <XIcon color="inherit" />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ color: 'ink.i900', pt: 10 }} align="center">
          © {new Date().getFullYear()} Bando. Todos los derechos reservados.
        </Typography>
      </Container>
    </FooterContainer>
  );
}
