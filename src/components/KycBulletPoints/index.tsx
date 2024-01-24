import Typography from '@mui/material/Typography';

import KycBg from '../../assets/kycBg.svg';
import CheckGreen from '../../assets/CheckGreen.svg';
import { styled } from '@mui/material/styles';

const KycBgImg = styled('img')(({ theme }) => ({
  width: '80%',
  height: 'auto',
  margin: '5% auto 0',
  display: 'block',
}));

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  alignSelf: 'flex-start',
  height: '100%',
}));

const BulletContainer = styled('div')(({ theme }) => ({
  maxWidth: '480px',
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(2, 0),
  paddingTop: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.ink.i900,
  fontSize: `${theme.typography.pxToRem(22)} !important`,
  lineHeight: '1.3em',
  textAlign: 'center',
  fontFamily: 'TWK Everett',
  fontWeight: 'normal',
}));

const BulletList = styled('ul')(({ theme }) => ({
  fontFamily: 'TWK Everett',
  color: theme.palette.ink.i900,
  fontSize: `${theme.typography.pxToRem(14)} !important`,
  paddingTop: theme.spacing(2),
  '& li': {
    listStyleImage: `url(${CheckGreen})`,
    padding: theme.spacing(1, 0),
    paddingLeft: theme.spacing(1),
  },
}));

export default function KycBulletPoints() {
  return (
    <Container>
      <KycBgImg src={KycBg} />
      <BulletContainer>
        <Title variant="h6">
          La forma más fácil y segura de enviar y recibir cripto a cualquier wallet.{' '}
        </Title>

        <BulletList>
          <li>Deposita con SPEI</li>
          <li>Recibe directo a tu wallet en segundos</li>
          <li>Elije recibir ETH, USDC, USDT o más tokens</li>
          <li>Sin gas fees</li>
        </BulletList>
      </BulletContainer>
    </Container>
  );
}
