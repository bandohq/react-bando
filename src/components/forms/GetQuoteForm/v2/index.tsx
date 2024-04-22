// import Grid from '@mui/material/Unstable_Grid2';
import BoxContainer from '@components/BoxContainer';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
// import debounce from 'lodash/debounce';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaV2, GetQuoteFormValuesV2 } from '../schema';

// import BandoButton from '@components/Button';
// import Input from '@components/forms/Input';
// import Select from '@components/forms/Select';
// import Hr from '@components/Hr';

// import Polygon from '../../../../assets/polygon.png';
// import Ethereum from '../../../../assets/ethereum.png';
import TokensWidget from '@components/TokensWidget';

// import useQuote from '@hooks/useQuote';
// import useUser from '@hooks/useUser';
import useTokens from '@hooks/useTokens';
import useNetworks from '@hooks/useNetworks';

// import { sendCurrency, depositCurrency } from '@config/constants/currencies';
// import { Quote } from '@hooks/useQuote/requests';
// import env from '@config/env';
// import formatNumber from '@helpers/formatNumber';

// const REQUEST_DEBOUNCE = 250;
const DEFAULT_NETWORK_KEY = 'pol';
const DEFAULT_QUOTE_CURRENCY = 'USDC';
const HAS_ONLY_CURRENCY = true;
const DEFAULT_CURRENCY = 'MXN';

export const CurrencyImg = styled('img')(({ theme }) => ({
  marginTop: '-10px',
  marginBottom: '-10px',
  padding: 0,
  marginRight: theme.spacing(1),
  width: 37,
  height: 37,
}));

export default function GetQuoteFormV2() {
  // const navigate = useNavigate();
  // const { isMutating, data, getQuote } = useQuote();
  // const { data } = useQuote();

  // const { user } = useUser();
  const methods = useForm<GetQuoteFormValuesV2>({
    resolver: yupResolver(schemaV2),
    defaultValues: {
      baseCurrency: DEFAULT_CURRENCY,
      operationType: 'deposit',
    },
  });

  const { handleSubmit, setValue } = methods;
  const { networks } = useNetworks();
  const { tokens } = useTokens({ chainKey: DEFAULT_NETWORK_KEY });
  // const quoteCurrency = watch('quoteCurrency');
  // const baseCurrency = watch('baseCurrency');
  // const operationType = watch('operationType');
  // const baseAmount = watch('baseAmount');

  const defaultNetwork = networks?.find((nwk) => nwk.key === DEFAULT_NETWORK_KEY) ?? networks?.[0];
  const usdcToken = tokens?.find((token) => token.key === DEFAULT_QUOTE_CURRENCY);

  // const depositCurrencyItems = operationType === 'deposit' ? sendCurrency : depositCurrency;
  // const sendCurrencyItems = operationType === 'deposit' ? depositCurrency : sendCurrency;
  // const operationCurrency = operationType === 'deposit' ? baseCurrency : quoteCurrency;
  // const rateText =
  //   operationType === 'deposit'
  //     ? `1 ${quoteCurrency} ≈ $${formatNumber(data?.quoteRateInverse) ?? 0} ${baseCurrency}`
  //     : `1 ${baseCurrency} ≈ $${formatNumber(data?.quoteRate) ?? 0} ${quoteCurrency}`;

  const onSubmit = () => {};

  useEffect(() => {
    // TODO: Remove this once adding the selection drawer
    if (defaultNetwork && usdcToken) {
      setValue('networkObj', defaultNetwork);
      setValue('tokenObj', usdcToken);
      setValue('quoteCurrency', usdcToken.key);
    }
  }, [setValue, defaultNetwork, usdcToken, tokens]);

  return (
    <BoxContainer sx={{ width: '100%', maxWidth: '600px' }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TokensWidget onlyOneCurrency={HAS_ONLY_CURRENCY} defaultCurrency={DEFAULT_CURRENCY} />
        </form>
      </FormProvider>
    </BoxContainer>
  );
}
