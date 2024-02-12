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
            <Typography variant="subtitle1" color="theme.palette.primary.main" gutterBottom>
              PRODUCTO
            </Typography>
            <Link href="/faq" color="#000" display="block">
              Preguntas Frecuentes
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="theme.palette.primary.main" gutterBottom>
              NOSOTROS
            </Typography>
            <Link href="/terms" color="#000" display="block">
              Política de Privacidad
            </Link>
            <Link href="/terms" color="#000" display="block">
              Términos y Condiciones
            </Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="theme.palette.primary.main" gutterBottom>
              SIGUENOS
            </Typography>
            <IconButton aria-label="Twitter" component="a" href={socialMediaLinks.twitter}>
              <XIcon color="inherit" />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 10 }}>
          © {new Date().getFullYear()} Bando. Todos los derechos reservados.
        </Typography>
      </Container>
    </FooterContainer>
  );
}
