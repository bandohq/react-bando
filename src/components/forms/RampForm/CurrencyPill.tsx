import { styled } from '@mui/material/styles';

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
  fontFamily: 'Kanit',
  fontWeight: 'bold',
  '& img': {
    width: '37px',
    height: '37px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: theme.typography.pxToRem(14),
    '& img': {
      width: '22px',
      height: '22px',
    },
  },
}));

type CurrencyPillProps = {
  currency: string;
  imgUrl?: string;
};

export default function CurrencyPill({ currency, imgUrl = '' }: Readonly<CurrencyPillProps>) {
  return (
    <Container sx={{ fontWeight: 'normal' }}>
      <img src={imgUrl} /> {currency}
    </Container>
  );
}
