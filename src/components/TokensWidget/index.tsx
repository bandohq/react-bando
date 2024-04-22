import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { GetQuoteFormValuesV2 } from '@components/forms/GetQuoteForm/schema';
import { currencyImgPathV2 as currencyImgPath } from '@config/constants/currencies';
// import { useMemo } from 'react';

// import ButtonBase, { ButtonProps } from '@mui/material/Button';
import CurrencyInput from 'react-currency-input-field';

// import { styled, alpha } from '@mui/material/styles';
// import { CurrencyContainerIcon } from '@components/TransactionsTable/TransactionRow';
import formatNumber from '@helpers/formatNumber';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';
import { CircularButton } from '@components/forms/RampForm/RampTitle';
import Title from '@components/PageTitle';
import UpDownArrow from '../../assets/UpDownArrow.svg';
import { TokensContainer, CurrencyTokenButton, CurrencyAmount } from './components';
import { OPERATION_TYPES } from '@hooks/useTransaction/requests';
import TokenPlaceholder from '../../assets/TokenPlaceholder.svg';
import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';
import { useCallback } from 'react';

type TokensWidgetProps = {
  onlyOneCurrency?: boolean;
  defaultCurrency?: string;
};

export default function TokensWidget({
  defaultCurrency = '',
  // onlyOneCurrency = false,
}: TokensWidgetProps) {
  const methods = useFormContext<GetQuoteFormValuesV2>();
  const baseCurrency = methods.watch('baseCurrency');
  // const baseAmount = methods.watch('baseAmount');
  const quoteCurrency = methods.watch('quoteCurrency');
  // const operationType = methods.watch('operationType');
  const networkObj = methods.watch('networkObj');
  const tokenObj = methods.watch('tokenObj');

  // const isDeposit = operationType === 'deposit';

  // const quoteAmount = methods.watch('quoteAmount');

  const switchOperation = () => {
    const _quoteCurrency = methods.getValues('quoteCurrency');
    const _baseCurrency = methods.getValues('baseCurrency');
    const _operationType = methods.getValues('operationType');
    const [_reverseOperation] = OPERATION_TYPES.filter((type) => type !== _operationType);

    methods.setValue('baseCurrency', _quoteCurrency);
    methods.setValue('quoteCurrency', _baseCurrency);
    methods.setValue('operationType', _reverseOperation);
  };

  const chooseCurrencyComp = useCallback(
    (currency?: string) => {
      const currencyImg = currencyImgPath[currency as unknown as keyof typeof currencyImgPath];
      if (currencyImg) {
        return <img alt={currency} src={currencyImg} />;
      }

      if (networkObj?.logoUrl && tokenObj?.imageUrl) {
        return (
          <>
            <img alt={'MXN'} src={tokenObj?.imageUrl ?? TokenPlaceholderGray} />
            <span className="network-img">
              <img alt="network" src={networkObj?.logoUrl ?? TokenPlaceholderGray} />
            </span>
          </>
        );
      }
      return (
        <Box sx={{ padding: 0 }}>
          <img alt={'Pick a token'} src={TokenPlaceholder} />{' '}
        </Box>
      );
    },
    [networkObj?.logoUrl, tokenObj?.imageUrl],
  );

  return (
    <TokensContainer container spacing={2}>
      <Grid xs={12} sm={12} md={12}>
        <Title variant="h2" sx={{ fontFamily: 'Kanit', mb: 1, fontSize: 20, color: 'ink.i900' }}>
          Entra al mundo cripto
        </Title>
      </Grid>

      <TokensContainer container spacing={2} sx={{ position: 'relative' }}>
        <>
          <Grid xs={12} sm={12} md={12}>
            <CurrencyTokenButton disabled={baseCurrency === defaultCurrency}>
              <p>Envías</p>
              <CurrencyAmount>
                <Box sx={{ width: '38px' }}>
                  <TransactionTypeIcon sx={{}}>
                    {chooseCurrencyComp(baseCurrency)}
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
                  <CurrencyInput
                    className="currency-input"
                    intlConfig={{ locale: 'en-US', currency: 'USD' }}
                    // intlConfig={isDeposit ? { locale: 'en-US', currency: 'USD' } : {}}
                    decimalsLimit={2}
                    placeholder="$0.00"
                    decimalSeparator="."
                  />
                  <span className="currency-amount">MXN</span>
                </Box>
              </CurrencyAmount>
            </CurrencyTokenButton>
          </Grid>

          <Grid xs={12} sm={12} md={12}>
            <CurrencyTokenButton disabled={quoteCurrency === defaultCurrency}>
              <p>Hacia</p>
              <CurrencyAmount>
                <Box sx={{ width: '38px' }}>
                  <TransactionTypeIcon>{chooseCurrencyComp(quoteCurrency)}</TransactionTypeIcon>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: 'center',
                  }}
                >
                  <input
                    className="currency-input placeholder"
                    value={quoteCurrency ?? ''}
                    placeholder="Selecciona una red y token"
                    disabled
                  />
                  <span className="currency-amount">{quoteCurrency ?? '-'}</span>
                </Box>
              </CurrencyAmount>
            </CurrencyTokenButton>
          </Grid>

          <CircularButton
            onClick={() => switchOperation()}
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
        </>
      </TokensContainer>

      <Grid xs={12} sm={12} md={12}>
        <CurrencyTokenButton disabled>
          <p>Recibes</p>
          <CurrencyAmount>
            <Box sx={{ width: '38px' }}>
              <TransactionTypeIcon>{chooseCurrencyComp(quoteCurrency)}</TransactionTypeIcon>
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
