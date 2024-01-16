import { styled } from '@mui/material/styles';
import { currencyImg } from '@config/constants/currencies';

const Container = styled('div')(({ theme }) => ({
  borderRadius: '100px',
  fontSize: theme.typography.pxToRem(20),
  border: `1px solid ${theme.palette.ink.i300}`,
  color: theme.palette.ink.i900,
  textAlign: 'left',
  width: 'fit-content',
  lineHeight: 'normal',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'TWK Everett',
  fontWeight: 'bold',
}));

type CurrencyPillProps = {
  currency: string;
};

export default function CurrencyPill({ currency }: Readonly<CurrencyPillProps>) {
  const currencyType = currency as keyof typeof currencyImg;

  return (
    <Container sx={{ fontWeight: 'normal' }}>
      {currencyImg[currencyType as keyof typeof currencyImg]} {currencyType}
    </Container>
  );
}
