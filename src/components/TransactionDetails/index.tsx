import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { PropsWithChildren } from 'react';
import RampTitle, { CircularButton as ArrowButton } from '@components/forms/RampForm/RampTitle';
import CurrencyPill from '@components/forms/RampForm/CurrencyPill';
import { Transaction } from '@hooks/useTransaction/requests';
import { SxProps, styled } from '@mui/material/styles';
import ArrowDown from '../../assets/ArrowDown.svg';
import Hr from '@components/Hr';
import { networkImg } from '@config/constants/currencies';

export type TransactionDetailProps = PropsWithChildren & {
  success: boolean;
  noContainer?: boolean;
  transaction?: Transaction;
  quoteRateInverse?: number;
  network?: string;
  sx?: SxProps;
};

const Rate = styled(Typography)(({ theme }) => ({
  fontSize: `${theme.typography.pxToRem(28)} !important`,
  fontWeight: '500',
  textAlign: 'right',
}));

const Amount = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 'normal',
  color: theme.palette.ink.i500,
  textAlign: 'right',
}));

const GridRow = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const BorderContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  width: 'calc(100% - 16px) !important',
  border: '1px solid #E6E7E9',
  borderRadius: '12px',
  padding: theme.spacing(2),
}));

const Network = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.ink.i700,
  textAlign: 'left',
  width: 'fit-content',
  lineHeight: 'normal',
}));

const DetailText = styled(Typography)(({ theme }) => ({
  fontFamily: 'TWK Everett',
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.ink.i700,
  textAlign: 'left',
  width: 'fit-content',
  lineHeight: 'normal',
}));

export default function TransactionDetail({
  children,
  transaction,
  quoteRateInverse,
  success = false,
  noContainer = false,
  network = '',
  sx,
}: TransactionDetailProps) {
  const DetailContainer = noContainer ? Box : BoxContainer;
  console.log({ sx });

  return (
    <DetailContainer sx={{ width: '100%', maxWidth: '600px', height: 'fit-content', ...sx }}>
      <Grid container spacing={2} sx={{ margin: 0 }}>
        <RampTitle success={success} noArrow={noContainer} />
      </Grid>
      <BorderContainer container spacing={2}>
        <Grid md={4} sm={6} xs={7}>
          <CurrencyPill currency={transaction?.baseCurrency ?? ''} />
        </Grid>
        <Grid md={8} sm={6} xs={5}>
          <Rate variant="body1">$ {transaction?.baseAmount}</Rate>
        </Grid>
        <Grid xs={12} sx={{ position: 'relative' }}>
          <Hr sx={{ marginBottom: 2 }} />
          <ArrowButton
            sx={{
              position: 'absolute',
              margin: '0 auto',
              top: '-12px',
              left: 'calc(50% - 29px)',
              pointerEvents: 'none',
            }}
          >
            <img src={ArrowDown} alt="" width={42} height={42} />
          </ArrowButton>
        </Grid>

        <Grid md={4} sm={6} xs={7}>
          <CurrencyPill currency={transaction?.quoteCurrency ?? ''} />
        </Grid>
        <Grid md={8} sm={6} xs={5}>
          <Rate variant="body1">$ {transaction?.quoteAmount}</Rate>
        </Grid>
        {!!quoteRateInverse && (
          <GridRow xs={12}>
            <Network variant="body2">Comisión:</Network>
            <Amount variant="body2">$ {quoteRateInverse}</Amount>
          </GridRow>
        )}
        {!!network && (
          <GridRow xs={12}>
            <Network variant="body2">Red:</Network>
            <Network variant="body2" sx={{ textAlign: 'right', textTransform: 'capitalize' }}>
              {network?.toLowerCase()}{' '}
              <img
                alt="Network"
                src={networkImg[network as keyof typeof networkImg]}
                width={18}
                height={18}
              />
            </Network>
          </GridRow>
        )}
      </BorderContainer>
      {children}

      {success && !transaction?.cashinDetails?.CLABE && (
        <Grid container spacing={2} sx={{ mx: 0, my: 1, padding: 1 }}>
          <GridRow xs={12} sx={{ mb: 0, pb: 0 }}>
            <Typography variant="h6" sx={{ padding: 0 }}>
              Deposita tu {transaction?.baseCurrency} a esta dirección en{' '}
              {transaction?.cashinDetails?.network}.
            </Typography>
          </GridRow>
          <GridRow xs={12}>
            <DetailText variant="body2" sx={{}}>
              Dirección:
            </DetailText>
            <DetailText variant="body2" sx={{ textAlign: 'right' }}>
              {transaction?.cashinDetails.address}
            </DetailText>
          </GridRow>
        </Grid>
      )}

      {success && !!transaction?.cashinDetails?.CLABE && (
        <>
          <Grid container spacing={2} sx={{ mx: 0, my: 1, padding: 1 }}>
            <GridRow xs={12} sx={{ mb: 0, pb: 0 }}>
              <Typography variant="h6" sx={{ padding: 0 }}>
                Deposita {transaction.baseCurrency} a la cuenta:
              </Typography>
            </GridRow>
          </Grid>
          <BorderContainer container spacing={2}>
            <GridRow xs={12}>
              <DetailText variant="body2" sx={{}}>
                Banco:
              </DetailText>
              <DetailText variant="body2" sx={{ textAlign: 'right' }}>
                {transaction?.cashinDetails.Bank}
              </DetailText>
            </GridRow>
            <GridRow xs={12}>
              <DetailText variant="body2" sx={{}}>
                Nombre:
              </DetailText>
              <DetailText variant="body2" sx={{ textAlign: 'right' }}>
                {transaction?.cashinDetails.Beneficiary}
              </DetailText>
            </GridRow>
            <GridRow xs={12}>
              <DetailText variant="body2" sx={{}}>
                CLABE:
              </DetailText>
              <DetailText variant="body2" sx={{ textAlign: 'right' }}>
                {transaction?.cashinDetails.CLABE}
              </DetailText>
            </GridRow>
            <GridRow xs={12}>
              <DetailText variant="body2" sx={{}}>
                Concepto:
              </DetailText>
              <DetailText variant="body2" sx={{ textAlign: 'right' }}>
                {transaction?.cashinDetails.concepto}
              </DetailText>
            </GridRow>
          </BorderContainer>
        </>
      )}
    </DetailContainer>
  );
}
