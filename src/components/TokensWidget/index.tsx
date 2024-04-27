import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import { useFormContext, Controller } from 'react-hook-form';
import { GetQuoteFormValuesV2 } from '@components/forms/GetQuoteForm/schema';
import { currencyImgPathV2 as currencyImgPath } from '@config/constants/currencies';
import BandoButton from '@components/Button';
// import { useMemo } from 'react';

// import ButtonBase, { ButtonProps } from '@mui/material/Button';
import CurrencyInput from 'react-currency-input-field';

// import { styled, alpha } from '@mui/material/styles';
// import { CurrencyContainerIcon } from '@components/TransactionsTable/TransactionRow';
import formatNumber from '@helpers/formatNumber';
import { TransactionTypeIcon } from '@components/TransactionsTable/CellDetailWithIcon';
import { CircularButton } from '@components/forms/RampForm/RampTitle';

import DialogDrawer from '@components/DialogDrawer';
import Title from '@components/PageTitle';
import UpDownArrow from '../../assets/UpDownArrow.svg';

import {
  TokensContainer,
  CurrencyTokenButton,
  CurrencyAmount,
  NetworkButton,
  NetworkBttnsCont,
} from './components';
import { OPERATION_TYPES } from '@hooks/useTransaction/requests';
import TokenPlaceholder from '../../assets/TokenPlaceholder.svg';
import TokenPlaceholderGray from '../../assets/TokenPlaceholderGray.svg';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useNetworks from '@hooks/useNetworks';
import { Network } from '@hooks/useNetworks/requests';
import { fillArray } from './helpers';
import useTokens from '@hooks/useTokens';
import Input from '@components/forms/Input';
import { Token } from '@hooks/useTokens/requests';

type TokensWidgetProps = {
  onlyOneCurrency?: boolean;
  defaultCurrency?: string;
};

type ShowMoreItem = {
  showNetworkList: boolean;
  name?: never;
  key?: never;
  logoUrl?: never;
  chainId?: never;
  rpcUrl?: never;
  explorerUrl?: never;
  isTestnet?: never;
  networkType?: never;
  isActive?: never;
};
type PreviewNetworkItem = Network | ShowMoreItem | null;
type PreviewNetworks = PreviewNetworkItem[];

export default function TokensWidget({
  defaultCurrency = '',
  // onlyOneCurrency = false,
}: TokensWidgetProps) {
  const methods = useFormContext<GetQuoteFormValuesV2>();
  const [openSelectDrawer, setOpenSelectDrawer] = useState(false);

  const baseCurrency = methods.watch('baseCurrency');
  // const baseAmount = methods.watch('baseAmount');
  const quoteCurrency = methods.watch('quoteCurrency');
  const operationType = methods.watch('operationType');
  const networkObj = methods.watch('networkObj');
  const tokenObj = methods.watch('tokenObj');
  const { networks = [] } = useNetworks();
  const { tokens } = useTokens({ chainKey: networkObj?.key ?? '' });
  console.log({ tokens });

  const _networks = useMemo(() => [...networks], [networks]);
  const _previewNetworks = useMemo(() => fillArray(5, _networks, 10), [_networks]);
  const previewNetworks = useMemo(() => {
    const lastItem = _previewNetworks[_previewNetworks.length - 1];
    const newArr = [..._previewNetworks] as unknown as PreviewNetworks;
    if (lastItem) {
      newArr.pop();
      newArr.push({ showNetworkList: true });
    }
    return newArr;
  }, [_previewNetworks]);

  const isDeposit = operationType === 'deposit';

  const onSelectNetwork = (network: Network) => {
    methods.setValue('tokenObj', null);
    methods.setValue('networkObj', network);
    methods.setValue('network', network.key);
  };
  const onSelectToken = (token: Token) => {
    methods.setValue('tokenObj', token);
    methods.setValue(isDeposit ? 'quoteCurrency' : 'baseCurrency', token.key);
    setOpenSelectDrawer((prev) => !prev);
  };

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
          <img alt={'Pick a token'} src={TokenPlaceholder} />
        </Box>
      );
    },
    [networkObj?.logoUrl, tokenObj?.imageUrl],
  );

  console.log({ networkObj, tokenObj, quoteCurrency, baseCurrency });

  return (
    <TokensContainer container spacing={2}>
      <DialogDrawer
        open={openSelectDrawer}
        onClose={() => setOpenSelectDrawer(!openSelectDrawer)}
        titleContent={
          <>
            <NetworkBttnsCont xs={12} sm={12} md={12} spacing={2}>
              {previewNetworks?.map((network: PreviewNetworkItem) => {
                if (!network) {
                  return (
                    <NetworkButton role="button" disabled>
                      <span>
                        <img src={TokenPlaceholderGray} />
                      </span>
                    </NetworkButton>
                  );
                }
                if (network?.showNetworkList) {
                  return (
                    // TODO: onclick open network list
                    <NetworkButton role="button">
                      + {_networks.length - previewNetworks.length}
                    </NetworkButton>
                  );
                }
                return (
                  <NetworkButton
                    role="button"
                    className={networkObj?.key === network?.key ? 'active' : ''}
                    onClick={() => onSelectNetwork(network as unknown as Network)}
                  >
                    <span>
                      <img alt={network?.key} src={network?.logoUrl} />
                    </span>
                  </NetworkButton>
                );
              })}
            </NetworkBttnsCont>
            <Grid xs={12} sm={12} md={12} spacing={2} sx={{ px: 0 }}>
              <Input fullWidth />
            </Grid>
          </>
        }
      >
        <ul>
          {tokens?.map((token) => <li onClick={() => onSelectToken(token)}>{token?.name}</li>)}
        </ul>
      </DialogDrawer>
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
                          onChange(value);
                        }}
                      />
                    )}
                  />
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
                  <TransactionTypeIcon sx={{ backgroundColor: 'background.paper' }}>
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
              <TransactionTypeIcon sx={{ backgroundColor: 'background.paper' }}>
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
              <input className="currency-input sm" type="text" value="0.0034567891 USDC" disabled />
              <span className="currency-amount">${formatNumber(69.456, 2, 6)} USD</span>
            </Box>
          </CurrencyAmount>
          <span className="currency-rate">1 USDC ≈ ${formatNumber(17.08)} MXN</span>
        </CurrencyTokenButton>
      </Grid>

      <Grid xs={12} sm={12} md={12}>
        <BandoButton type="submit" variant="contained" fullWidth sx={{ py: 2, mt: 2 }}>
          Comenzar
        </BandoButton>
      </Grid>
    </TokensContainer>
  );
}
