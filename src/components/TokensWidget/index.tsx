import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import CurrencyInput from 'react-currency-input-field';

import { ReactNode, useCallback, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { GetQuoteFormValuesV2 } from '@components/forms/GetQuoteForm/schema';
import { currencyImgPathV2 as currencyImgPath } from '@config/constants/currencies';

import formatNumber from '@helpers/formatNumber';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';
import { CircularButton } from '@components/forms/RampForm/RampTitle';

import DialogDrawer from '@components/DialogDrawer';
import Title from '@components/PageTitle';
import ErrorBox from '@components/forms/ErrorBox';
import BandoButton from '@components/Button';
import NetworkTiles from './NetworkTiles';
import TokensList from './TokensList';

import UpDownArrow from '../../assets/UpDownArrow.svg';
import TokenPlaceholder from '../../assets/TokenPlaceholder.svg';
import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';

import { TokensContainer, CurrencyTokenButton, CurrencyAmount } from './components';

import { Token } from '@hooks/useTokens/requests';
import { Quote } from '@hooks/useQuote/requests';
import { Network } from '@hooks/useNetworks/requests';
import { OPERATION_TYPES } from '@hooks/useTransaction/requests';
import useTokens from '@hooks/useTokens';

type TokensWidgetProps = {
  onlyOneCurrency?: boolean;
  defaultCurrency?: string;
  rateText?: ReactNode;
  quote?: Quote;
  onQuantityChange?: () => void;
  formError?: string;
};

export default function TokensWidget({
  defaultCurrency = '',
  onQuantityChange = () => {},
  rateText = '',
  quote,
  formError,
}: TokensWidgetProps) {
  const methods = useFormContext<GetQuoteFormValuesV2>();
  const [openSelectDrawer, setOpenSelectDrawer] = useState(false);

  const baseCurrency = methods.watch('baseCurrency');
  const baseAmount = methods.watch('baseAmount');
  const quoteCurrency = methods.watch('quoteCurrency');

  const operationType = methods.watch('operationType');
  const networkObj = methods.watch('networkObj');
  const tokenObj = methods.watch('tokenObj');

  const isDeposit = operationType === 'deposit';
  const canCheckQuote =
    parseFloat(baseAmount as unknown as string) >= 20 && !!networkObj?.chainId && !!tokenObj?.id;

  const { tokens, filterTokens } = useTokens({ chainKey: networkObj?.key ?? '' });

  const onSelectNetwork = (network: Network) => {
    methods.setValue('tokenObj', {});
    methods.setValue('networkObj', network);
    methods.setValue('network', network.key ?? network.name);
  };

  const onSelectToken = (token: Token) => {
    methods.setValue('tokenObj', token);
    methods.setValue(isDeposit ? 'quoteCurrency' : 'baseCurrency', token.key ?? token.name);
    onQuantityChange();
    setOpenSelectDrawer((prev) => !prev);
  };

  const switchOperation = () => {
    const _quoteCurrency = methods.getValues('quoteCurrency');
    const _baseCurrency = methods.getValues('baseCurrency');
    const _operationType = methods.getValues('operationType');
    const [_reverseOperation] = OPERATION_TYPES.filter((type) => type !== _operationType);

    methods.setValue('baseCurrency', _quoteCurrency);
    methods.setValue('quoteCurrency', _baseCurrency);
    methods.setValue('operationType', _reverseOperation);
    onQuantityChange();
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
          <img alt={'Pick a token'} src={TokenPlaceholder} />
        </Box>
      );
    },
    [networkObj?.logoUrl, tokenObj?.imageUrl],
  );

  return (
    <TokensContainer container spacing={2}>
      <DialogDrawer
        open={openSelectDrawer}
        onClose={() => {
          setOpenSelectDrawer(!openSelectDrawer);
          if (canCheckQuote) onQuantityChange();
        }}
        titleContent={
          <>
            <NetworkTiles networkObj={networkObj} onSelectNetwork={onSelectNetwork} />
            <Box id="search-tokens" sx={{ width: '100%' }} />
          </>
        }
      >
        <TokensList
          onSelectToken={onSelectToken}
          tokenObj={tokenObj}
          tokens={tokens}
          filterTokens={filterTokens}
        />
      </DialogDrawer>
      <div id="network-list" />

      <Grid xs={12} sm={12} md={12}>
        <Title variant="h2" sx={{ fontFamily: 'Kanit', mb: 1, fontSize: 20, color: 'ink.i900' }}>
          Entra al mundo cripto
        </Title>
      </Grid>

      <TokensContainer container spacing={2} sx={{ position: 'relative' }}>
        <>
          <Grid xs={12} sm={12} md={12}>
            <CurrencyTokenButton
              role="button"
              disabled={baseCurrency === defaultCurrency}
              onClick={() => setOpenSelectDrawer(!openSelectDrawer)}
            >
              <p>Envías</p>
              <CurrencyAmount>
                <Box sx={{ width: '38px' }}>
                  <TransactionTypeIcon sx={{ backgroundColor: 'background.paper' }}>
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
                  <Controller
                    control={methods.control}
                    name="baseAmount"
                    render={({ field: { onChange, value } }) => (
                      <CurrencyInput
                        className="currency-input"
                        prefix={isDeposit ? '$' : ''}
                        decimalsLimit={2}
                        placeholder={isDeposit ? '$0.00' : '0.00'}
                        decimalSeparator="."
                        value={value}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onValueChange={(value) => {
                          if (value !== String(baseAmount)) {
                            onChange(value);
                            if (networkObj?.chainId && tokenObj?.id) onQuantityChange();
                          }
                        }}
                      />
                    )}
                  />
                  {!!methods.formState.errors.baseAmount?.message && (
                    <span className="currency-error">
                      {methods.formState.errors.baseAmount?.message}
                    </span>
                  )}
                  <span className="currency-amount">{baseCurrency}</span>
                </Box>
              </CurrencyAmount>
            </CurrencyTokenButton>
          </Grid>

          <Grid xs={12} sm={12} md={12}>
            <CurrencyTokenButton
              role="button"
              disabled={quoteCurrency === defaultCurrency}
              onClick={() => setOpenSelectDrawer(!openSelectDrawer)}
            >
              <p>Hacia</p>
              <CurrencyAmount>
                <Box sx={{ width: '38px' }}>
                  <TransactionTypeIcon role="button" sx={{ backgroundColor: 'background.paper' }}>
                    {chooseCurrencyComp(quoteCurrency)}
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
                  <input
                    className="currency-input placeholder"
                    value={quoteCurrency ?? ''}
                    placeholder="Selecciona una red y token"
                    disabled
                  />
                  <span className="currency-amount">{isDeposit ? networkObj?.name : ''}</span>
                </Box>
              </CurrencyAmount>
            </CurrencyTokenButton>
          </Grid>

          <CircularButton
            role="button"
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
        <CurrencyTokenButton role="button" disabled>
          <p>Recibes</p>
          <CurrencyAmount>
            <Box sx={{ width: '38px' }}>
              <TransactionTypeIcon role="button" sx={{ backgroundColor: 'background.paper' }}>
                {chooseCurrencyComp(quoteCurrency)}
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
              <input
                className="currency-input sm"
                type="text"
                value={`${formatNumber(quote?.quoteAmount ?? 0)} ${quote?.quoteCurrency ?? ''}`}
                disabled
              />
              {/* <span className="currency-amount">${formatNumber(69.456, 2, 6)} USD</span> */}
              <span className="currency-amount">-</span>
            </Box>
          </CurrencyAmount>
          <span className="currency-rate">{rateText}</span>
        </CurrencyTokenButton>
      </Grid>

      {!!formError && (
        <Grid md={12} sm={12} xs={12} sx={{}}>
          <ErrorBox>{formError}</ErrorBox>
        </Grid>
      )}

      <Grid xs={12} sm={12} md={12}>
        <BandoButton type="submit" variant="contained" fullWidth sx={{ py: 2, mt: 2 }}>
          Comenzar
        </BandoButton>
      </Grid>
    </TokensContainer>
  );
}
