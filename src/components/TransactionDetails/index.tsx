import BoxContainer from '@components/BoxContainer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

import { PropsWithChildren } from 'react';
import { Transaction, OperationType } from '@hooks/useTransaction/requests';
import { SxProps, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import RampTitle, { CircularButton as ArrowButton } from '@components/forms/RampForm/RampTitle';
import RateText from './RateText';
import BandoAlert from '@components/Alert';
import CurrencyPill from '@components/forms/RampForm/CurrencyPill';
import Hr from '@components/Hr';
import TransactionCopyText, { DetailText } from './TransactionCopyText';
import ArrowDown from '../../assets/ArrowDown.svg';
import StatusBadge from '@components/StatusBadge';

import formatNumber from '@helpers/formatNumber';
import mapProviderStatus from './mapProviderStatus';
import { deleteStorageQuote } from '@helpers/getStorageQuote';
import { bandoAcademy } from '@config/constants/links';
import { Network as NetworkObj } from '@hooks/useNetworks/requests';
import { Token } from '@hooks/useTokens/requests';
import { currencyImgPathV2 as currencyImgPath } from '@config/constants/currencies';

export type TransactionDetailProps = PropsWithChildren & {
  success: boolean;
  noContainer?: boolean;
  noArrow?: boolean;
  showStatusBadge?: boolean;
  transaction?: Transaction;
  quoteRateInverse?: number;
  quoteRate?: number;
  networkObj: NetworkObj | null;
  tokenObj: Token | null;
  title?: string;
  sx?: SxProps;
  showFooter?: boolean;
  operationType?: OperationType;
};

const Rate = styled(Typography)(({ theme }) => ({
  fontWeight: '500',
  textAlign: 'right',
  marginTop: theme.spacing(1.4),
  textWrap: 'wrap',
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: theme.typography.pxToRem(18),
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(20),
  },
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(26),
  },
}));

const GridRow = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&.sm-column': {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const BorderContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  width: 'calc(100% - 16px) !important',
  border: '1px solid #E6E7E9',
  borderRadius: '12px',
  padding: theme.spacing(2, 0.5),
}));

const Network = styled(Typography)(({ theme }) => ({
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
  quoteRate,
  success = false,
  noContainer = false,
  noArrow = false,
  showStatusBadge = false,
  showFooter = false,
  networkObj,
  tokenObj,
  title = '',
  sx,
  operationType,
}: TransactionDetailProps) {
  const { t } = useTranslation('transactionDetail');
  console.log({ transaction });

  const navigate = useNavigate();
  const isDeposit = (transaction?.operationType ?? operationType) === 'deposit';
  const DetailContainer = noContainer ? Box : BoxContainer;
  const networkKey = networkObj?.key || transaction?.networkConfig?.key;
  const depositTitle = transaction?.cashinDetails?.CLABE
    ? `Envía ${transaction.baseCurrency} a la cuenta:`
    : `Envía tu ${transaction?.baseCurrency} a esta dirección en
  ${transaction?.cashinDetails?.network}:`;
  const rate = isDeposit ? quoteRateInverse : quoteRate;

  const providerStatus = mapProviderStatus(transaction?.providerStatus ?? '');

  const tokenImg = transaction?.asset?.imageUrl ?? tokenObj?.imageUrl;
  const baseCurrencyImg = {
    baseImg: isDeposit
      ? currencyImgPath[transaction?.baseCurrency as unknown as keyof typeof currencyImgPath]
      : tokenImg,
    quoteImg: !isDeposit
      ? currencyImgPath[transaction?.quoteCurrency as unknown as keyof typeof currencyImgPath]
      : tokenImg,
  };

  const onNewTransaction = () => {
    deleteStorageQuote();
    navigate('/');
  };

  return (
    <>
      <DetailContainer sx={{ width: '100%', maxWidth: '600px', height: 'fit-content', ...sx }}>
        <Grid container spacing={2} sx={{ margin: 0, display: 'flex', flexDirection: 'row' }}>
          <RampTitle
            success={success}
            noArrow={noContainer || noArrow}
            title={title}
            subtitle={providerStatus.subtitle || undefined}
            leftContent={
              showStatusBadge &&
              providerStatus.text && (
                <StatusBadge {...providerStatus} showPulse={providerStatus.color === 'pending'} />
              )
            }
          />
        </Grid>
        <BorderContainer container spacing={2}>
          <Grid md={4} sm={5} xs={5}>
            <CurrencyPill
              currency={transaction?.baseCurrency ?? ''}
              imgUrl={baseCurrencyImg.baseImg}
            />
          </Grid>
          <Grid md={8} sm={7} xs={7}>
            <Rate>{formatNumber(transaction?.baseAmount)}</Rate>
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

          <Grid md={4} sm={5} xs={5}>
            <CurrencyPill
              currency={transaction?.quoteCurrency ?? ''}
              imgUrl={baseCurrencyImg.quoteImg}
            />
          </Grid>
          <Grid md={8} sm={7} xs={7}>
            <Rate>{formatNumber(transaction?.quoteAmount, 2, 18)}</Rate>
          </Grid>
          {!!rate && (
            <GridRow xs={12} sx={{ display: 'flex !important' }}>
              <Network
                variant="body2"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RateText operationType={operationType} transaction={transaction} rate={rate} />
              </Network>
            </GridRow>
          )}
          {!!networkKey && (
            <GridRow xs={12} sx={{ display: 'flex !important' }}>
              <Network variant="body2">Red:</Network>
              <Network variant="body2" sx={{ textAlign: 'right', textTransform: 'capitalize' }}>
                {(transaction?.networkConfig?.name ?? networkObj?.name ?? '').toLowerCase()}{' '}
                <img
                  alt="Network"
                  src={transaction?.networkConfig?.imageUrl ?? networkObj?.logoUrl}
                  width={18}
                  height={18}
                  style={{ borderRadius: '50px' }}
                />
              </Network>
            </GridRow>
          )}
        </BorderContainer>

        {children}

        {success && !!transaction?.cashinDetails && (
          <>
            <Grid container spacing={2} sx={{ m: 0, px: 1, py: 0 }}>
              <GridRow xs={12} sx={{ mb: 0, pb: 0 }}>
                <Typography variant="h6" sx={{ padding: 0, mb: 0 }}>
                  {depositTitle}
                </Typography>
              </GridRow>
            </Grid>
            {!!transaction?.cashinDetails?.concepto && (
              <BandoAlert text={t('speiAlert')} title={t('speiAlertTitle')} severity="info" />
            )}
            <BorderContainer container spacing={2}>
              {!transaction?.cashinDetails?.CLABE ? (
                <GridRow xs={12} sx={{ gap: 1 }} className="sm-column">
                  <TransactionCopyText
                    variant="body2"
                    sx={{ textAlign: 'right' }}
                    ellipse
                    text={transaction?.cashinDetails?.address ?? ''}
                  />
                </GridRow>
              ) : (
                <>
                  <GridRow xs={12}>
                    <DetailText variant="body2" sx={{ mr: 1 }}>
                      {t('bank')}
                    </DetailText>
                    <TransactionCopyText
                      variant="body2"
                      sx={{ textAlign: 'right' }}
                      text={transaction?.cashinDetails?.Bank}
                    />
                  </GridRow>
                  <GridRow xs={12}>
                    <DetailText variant="body2" sx={{ mr: 1 }}>
                      {t('name')}
                    </DetailText>
                    <TransactionCopyText
                      variant="body2"
                      sx={{ textAlign: 'right' }}
                      text={transaction?.cashinDetails?.Beneficiary}
                    />
                  </GridRow>
                  <GridRow xs={12}>
                    <DetailText variant="body2" sx={{ mr: 1 }}>
                      {t('clabe')}
                    </DetailText>
                    <TransactionCopyText
                      variant="body2"
                      sx={{ textAlign: 'right' }}
                      text={transaction?.cashinDetails?.CLABE}
                    />
                  </GridRow>
                  <GridRow xs={12}>
                    <DetailText variant="body2" sx={{ mr: 1 }}>
                      {t('concepto')}
                    </DetailText>
                    <TransactionCopyText
                      variant="body2"
                      sx={{ textAlign: 'right', color: 'primary.dark', fontWeight: 700 }}
                      text={transaction?.cashinDetails?.concepto}
                    />
                  </GridRow>
                </>
              )}
            </BorderContainer>
          </>
        )}
      </DetailContainer>
      {showFooter && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            marginTop: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button sx={{ textTransform: 'none', padding: 0 }} onClick={onNewTransaction}>
            <ArrowBackIcon /> {t('footer.newTransaction')}
          </Button>

          <Button sx={{ textTransform: 'none', padding: 0 }} href={bandoAcademy}>
            {t('footer.academy')}
          </Button>
        </Box>
      )}
    </>
  );
}
