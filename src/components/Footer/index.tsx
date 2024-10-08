import Box, { BoxProps } from '@mui/material/Box';
import { Grid, Link, Typography, Container, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import XIcon from '@mui/icons-material/X';
import Logo from '../../assets/logo_white.svg';

const FooterContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(3),
  paddingTop: theme.spacing(0),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
}));

const FooterLogo = styled('img')(() => ({
  width: '100%',
  maxWidth: '100px',
  height: 'auto',
  verticalAlign: 'middle',
  display: 'inline-block',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
}));

const socialMediaLinks = {
  twitter: 'https://twitter.com/BandoCool',
};

export default function Footer() {
  const { t } = useTranslation('footer');
  return (
    <FooterContainer>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1200px',
          minHeight: '200px',
          borderTop: '1px solid',
          borderColor: 'primary.contrastText',
          paddingTop: '30px',
        }}
      >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <FooterLogo src={Logo} loading="lazy" alt="" aria-label="Bando footer logo" />
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.contrastText', fontWeight: 700 }}
              gutterBottom
            >
              {t('productTitle')}
            </Typography>
            <FooterLink href="/faq" display="block">
              {t('productFAQ')}
            </FooterLink>
            <FooterLink href="https://academy.bando.cool" target="_blank" display="block">
              {t('academyLink')}
            </FooterLink>
            <FooterLink href="https://status.bando.cool" target="_blank" display="block">
              {t('statusLink')}
            </FooterLink>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.contrastText', fontWeight: 700 }}
              gutterBottom
            >
              {t('companyTitle')}
            </Typography>
            <FooterLink href="/terms" display="block">
              {t('privacy')}
            </FooterLink>
            <FooterLink href="/terms" display="block">
              {t('terms')}
            </FooterLink>
            <FooterLink href="mailto:soporte@bando.cool" display="block">
              {t('contact')}
            </FooterLink>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ color: 'primary.contrastText', fontWeight: 700 }}
              gutterBottom
            >
              {t('followUs')}
            </Typography>
            <IconButton
              aria-label="Twitter"
              target="_blank"
              component="a"
              href={socialMediaLinks.twitter}
              sx={{ color: 'primary.contrastText' }}
            >
              <XIcon color="inherit" />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ color: 'primary.contrastText', pt: 10 }} align="center">
          {t('disclaimer')}
        </Typography>
      </Container>
    </FooterContainer>
  );
}
