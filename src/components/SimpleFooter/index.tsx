import { Typography, Container } from '@mui/material';

type SimpleFooterProps = {
  bgColor?: string;
  textColor?: string;
};

export default function SimpleFooter({ bgColor, textColor }: SimpleFooterProps) {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1200px',
        minHeight: '150px',
        paddingTop: '30px',
        backgroundColor: bgColor || 'primary.main',
      }}
    >
      <Typography variant="body2" sx={{ color: textColor, pt: 6 }} align="center">
        © {new Date().getFullYear()} Bando. Todos los derechos reservados.
      </Typography>
    </Container>
  );
}
