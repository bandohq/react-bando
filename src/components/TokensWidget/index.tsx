import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { currencyImgPath, networkImg } from '@config/constants/currencies';

import ButtonBase, { ButtonProps } from '@mui/material/Button';
import CurrencyInput from 'react-currency-input-field';

import { styled, alpha } from '@mui/material/styles';
import { CurrencyContainerIcon } from '@components/TransactionsTable/TransactionRow';
import formatNumber from '@helpers/formatNumber';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';
import { CircularButton } from '@components/forms/RampForm/RampTitle';
import Title from '@components/PageTitle';
import UpDownArrow from '../../assets/UpDownArrow.svg';
// import TokenPlaceholder from '../../assets/TokenPlaceholder.svg';

const TokensContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  margin: 0,
  padding: 0,
  fontFamily: 'Kanit',
  '& input.currency-input': {
    border: 'none',
    pointerEvents: 'auto',
    outline: 0,
    backgroundColor: 'transparent',
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 0,
    margin: 0,
    width: '100%',
    color: theme.palette.ink.i950,
    '&.sm': {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: 'normal',
    },
    '&::placeholder': {
      color: theme.palette.ink.i950,
    },
  },
  '& span.currency-amount': {
    color: theme.palette.ink.i400,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: theme.typography.pxToRem(14),
    content: '" "',
  },
  '& span.currency-rate': {
    color: theme.palette.ink.i500,
    fontSize: theme.typography.pxToRem(10),
    marginTop: theme.spacing(1),
  },
}));

const CurrencyTokenButton = styled(ButtonBase)<ButtonProps>(({ theme }) => ({
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  width: '100%',
  boxShadow: 'none',
  textTransform: 'none',
  textAlign: 'left',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '12px 24px',
  fontSize: '1rem',
  fontFamily: 'Kanit',
  color: theme.palette.ink.i950,
  backgroundColor: theme.palette.ink.i150,
  borderColor: theme.palette.ink.i250,
  borderWidth: '1px',
  borderStyle: 'solid',
  '& p': {
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(12),
  },
  '&:hover:not(.MuiButton-text)': {
    backgroundColor: `${alpha(theme.palette.ink.i150, 0.55)}`,
    backgroundImage: 'linear-gradient(rgb(0 0 0/20%) 0 0)',
    boxShadow: 'none',
  },
  '&:disabled': { color: theme.palette.ink.i950 },
}));

const CurrencyAmount = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  alignItems: 'flex-start',
  pointerEvents: 'auto',
  '& p': {
    fontFamily: 'TWK Everett',
    lineHeight: 'auto',
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 'bold',
    margin: 0,
  },
}));

export default function TokensWidget() {
  return (
    <TokensContainer container spacing={2}>
      <Grid xs={12} sm={12} md={12}>
        <Title variant="h2" sx={{ fontFamily: 'Kanit', mb: 1, fontSize: 20, color: 'ink.i900' }}>
          Entra al mundo cripto
        </Title>
      </Grid>

      <TokensContainer container spacing={2} sx={{ position: 'relative' }}>
        <Grid xs={12} sm={12} md={12}>
          <CurrencyTokenButton disabled>
            <p>Envías</p>
            <CurrencyAmount>
              <Box sx={{ width: '38px' }}>
                <CurrencyContainerIcon sx={{ border: '0', display: 'flex' }}>
                  <img alt={'MXN'} src={currencyImgPath.MXN} />
                </CurrencyContainerIcon>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyItems: 'center',
                }}
              >
                <CurrencyInput
                  className="currency-input"
                  intlConfig={{ locale: 'en-US', currency: 'USD' }}
                  decimalsLimit={2}
                  placeholder="$0.00"
                  decimalSeparator="."
                />
                <span className="currency-amount">MXN</span>
              </Box>
            </CurrencyAmount>
          </CurrencyTokenButton>
        </Grid>

        <CircularButton
          sx={{
            position: 'absolute',
            margin: '0 auto',
            top: 'calc(50% - 29px)',
            left: 'calc(50% - 29px)',
            zIndex: 1000,
          }}
        >
          <img src={UpDownArrow} alt="" width={42} height={42} />
        </CircularButton>

        <Grid xs={12} sm={12} md={12}>
          <CurrencyTokenButton disabled>
            <p>Hacia</p>
            <CurrencyAmount>
              <Box sx={{ width: '38px' }}>
                <TransactionTypeIcon>
                  {/* <img alt={'MXN'} src={TokenPlaceholder} /> */}
                  <img alt={'MXN'} src={currencyImgPath.USDC} />
                  <span className="network-img">
                    <img alt="network" src={networkImg.POLYGON} />
                  </span>
                </TransactionTypeIcon>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyItems: 'center',
                }}
              >
                <input className="currency-input" value="USDC" disabled />
                <span className="currency-amount">Arbitrum</span>
              </Box>
            </CurrencyAmount>
          </CurrencyTokenButton>
        </Grid>
      </TokensContainer>

      <Grid xs={12} sm={12} md={12}>
        <CurrencyTokenButton disabled>
          <p>Recibes</p>
          <CurrencyAmount>
            <Box sx={{ width: '38px' }}>
              <TransactionTypeIcon>
                <img alt={'MXN'} src={currencyImgPath.USDC} />
                <span className="network-img">
                  <img alt="network" src={networkImg.POLYGON} />
                </span>
              </TransactionTypeIcon>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
              }}
            >
              <input className="currency-input sm" type="text" value="0.0034567891 USDC" disabled />
              <span className="currency-amount">${formatNumber(69.456, 2, 6)} USD</span>
            </Box>
          </CurrencyAmount>
          <span className="currency-rate">1 USDC ≈ ${formatNumber(17.08)} MXN</span>
        </CurrencyTokenButton>
      </Grid>
    </TokensContainer>
  );
}
