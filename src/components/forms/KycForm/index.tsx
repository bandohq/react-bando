import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import MuiInput from '@components/forms/MuiInput';
import MuiSelect from '@components/forms/MuiSelect';
import MuiPhoneInput from '@components/forms/MuiInput/MuiPhoneInput';
import BoxContainer from '@components/BoxContainer';
import PlacesAutocomplete from '@components/forms/PlacesAutocomplete';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import QuestionCircleIcon from '@mui/icons-material/Help';
import INE from '@assets/ine_ref.png';

import ErrorBox from '@components/forms/ErrorBox';
import BandoButton from '@components/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Title from '@components/PageTitle';

import { toUpperCase, checkNumberLength } from '@helpers/inputs';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema, { KycFormValues } from './schema';
import { AxiosError } from 'axios';

import useKyc from '@hooks/useKyc';
import useUser from '@hooks/useUser';
import useRemoteConfig from '@hooks/useRemoteConfig';
import { useNavigate } from 'react-router-dom';

import { identificationOptions, Identifications } from '@config/constants/identification';
import { AcceptedCountries, countryOptions } from '@config/constants/countries';
import { useState } from 'react';
import getStorageQuote from '@helpers/getStorageQuote';
import { useTranslation } from 'react-i18next';

const P = styled('p')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.ink.i600,
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: theme.typography.pxToRem(10),
  },
}));

const H5 = styled('h5')(({ theme }) => ({
  textAlign: 'center',
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 'normal',
  color: theme.palette.ink.i500,
  [theme.breakpoints.between('xs', 'sm')]: {
    fontSize: theme.typography.pxToRem(10),
  },
}));

const KYCTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[2],
  },
}));

const DEFAULT_PHONE_COUNTRY = 'mx';
export default function KycForm() {
  const { t } = useTranslation('form');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const { configs } = useRemoteConfig();
  const { user } = useUser();
  const { isMutating, postUserKyc } = useKyc();
  const storageQuote = getStorageQuote();
  const { register, control, formState, handleSubmit, setValue } = useForm<KycFormValues>({
    resolver: yupResolver(schema(t)),
    mode: 'onBlur',
    defaultValues: {
      phone: '',
      type: 'PERSON',
      document: {
        country: 'MX',
        type: Identifications.NATIONAL_IDENTITY_CARD,
      },
    },
  });

  const onSubmit = async (formValues: KycFormValues) => {
    setError('');
    try {
      await postUserKyc({ ...formValues, email: user?.email as string });

      if (storageQuote.quote?.baseAmount) return navigate('/ramp', { replace: true });
      return navigate('/', { replace: true });
    } catch (err) {
      if ((err as AxiosError).response?.status === 403) {
        setError(`Bando está en beta privado. Para poder ser de nuestros primeros usuarios envía un
        correo a soporte@bando.cool`);
        return;
      }
      if ((err as AxiosError<{ code: string; error: string }>).response?.data.code) {
        setError(
          (err as AxiosError<{ code: string; error: string }>).response?.data.error ||
            t('errors.general'),
        );
        return;
      }
      setError(t('errors.general'));
      return;
    }
  };

  return (
    <BoxContainer sx={{ maxWidth: { md: '60vw' }, width: { md: '30vw' }, m: '0 auto' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title variant="h4" sx={{ mt: 1 }}>
          Verifica tu identidad
        </Title>
        <Grid container spacing={1} sx={{ m: 0 }}>
          <Grid md={6} xs={12}>
            <MuiInput
              label={t('kyc.fields.name')}
              type="text"
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              {...register('firstName')}
              error={!!formState.errors.firstName?.message}
              helperText={formState.errors.firstName?.message}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <MuiInput
              label={t('kyc.fields.lastName')}
              type="text"
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              {...register('lastName')}
              error={!!formState.errors.lastName?.message}
              helperText={formState.errors.lastName?.message}
            />
          </Grid>
          <Grid md={12} xs={12}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <MuiPhoneInput
                  sx={{ mt: 2 }}
                  defaultCountry={DEFAULT_PHONE_COUNTRY}
                  label={t('kyc.fields.phone')}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  forceDialCode
                  error={!!formState.errors.phone?.message}
                  helperText={formState.errors.phone?.message}
                />
              )}
            />
          </Grid>
          <Grid md={12} xs={12}>
            <MuiInput
              label="RFC"
              type="text"
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
              {...register('nationalIdNumber', {
                onChange: (e) => {
                  toUpperCase(e);
                  checkNumberLength(e, 13);
                },
              })}
              error={!!formState.errors.nationalIdNumber?.message}
              helperText={formState.errors.nationalIdNumber?.message}
            />
          </Grid>

          <Title variant="h4" sx={{ mt: 2 }}>
            Verifica tu domicilio
          </Title>

          <Grid container spacing={1} sx={{ margin: 0 }}>
            {configs?.useGoogleAutocomplete && (
              <Grid md={12} xs={12}>
                <PlacesAutocomplete
                  label="Busca tu domicilio o llena los campos manualmente"
                  noOptionsText="No se encontro el domicilio"
                  setInputValue={(label, address) => {
                    setValue('address.label', label);

                    if (address) {
                      setValue('address.street', address.street ?? '');
                      setValue('address.state', address.state ?? '');
                      setValue('address.zip', address.zip ?? '');
                      setValue('address.country', address.country ?? '');
                      setValue('address.neighborhood', address.neighborhood ?? '');
                    }
                  }}
                  error={!!formState.errors.address?.label?.message}
                  helperText={formState.errors.address?.label?.message}
                />
              </Grid>
            )}
            <Grid md={12} xs={12}>
              <MuiInput
                label={t('kyc.fields.street')}
                type="text"
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
                {...register('address.street')}
                error={!!formState.errors.address?.street?.message}
                helperText={formState.errors.address?.street?.message}
              />
            </Grid>
            <Grid md={12} xs={12}>
              <MuiInput
                label={t('kyc.fields.neighborhood')}
                type="text"
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
                {...register('address.neighborhood')}
                error={!!formState.errors.address?.neighborhood?.message}
                helperText={formState.errors.address?.neighborhood?.message}
              />
            </Grid>
            <Grid md={8} xs={12}>
              <MuiInput
                label={t('kyc.fields.state')}
                type="text"
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
                {...register('address.state')}
                error={!!formState.errors.address?.state?.message}
                helperText={formState.errors.address?.state?.message}
              />
            </Grid>
            <Grid md={4} xs={12}>
              <MuiInput
                label={t('kyc.fields.zip')}
                type="text"
                sx={{ mt: 2 }}
                InputLabelProps={{ shrink: true }}
                {...register('address.zip')}
                error={!!formState.errors.address?.zip?.message}
                helperText={formState.errors.address?.zip?.message}
              />
            </Grid>
            <Grid md={12} xs={12}>
              <MuiSelect
                sx={{ mt: 2 }}
                defaultValue={AcceptedCountries.MX}
                {...register('address.country')}
                items={countryOptions}
                label={t('kyc.fields.country')}
                InputLabelProps={{ shrink: true }}
                error={!!formState.errors.address?.country?.message}
                helperText={formState.errors.address?.country?.message}
              />
            </Grid>
          </Grid>

          <Title variant="h4" sx={{ mt: 2, mb: 1 }}>
            {t('identification.type')}
            <KYCTooltip
              title={
                <React.Fragment>
                  <img src={INE} alt="INE" style={{ width: '100%' }} />
                </React.Fragment>
              }
            >
              <QuestionCircleIcon sx={{ fontSize: '17px', ml: '5px', verticalAlign: 'middle' }} />
            </KYCTooltip>
          </Title>
          <Grid container spacing={1} sx={{ m: 0, width: '100%' }}>
            <Grid md={4} xs={12}>
              <MuiSelect
                sx={{ mt: 2 }}
                defaultValue={Identifications.NATIONAL_IDENTITY_CARD}
                {...register('document.type')}
                items={identificationOptions}
                label={t('identification.type')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid md={8} xs={12}>
              <MuiInput
                sx={{ mt: 2, width: '100%' }}
                label={t('kyc.document')}
                type="text"
                InputLabelProps={{ shrink: true }}
                {...register('document.number')}
                error={!!formState.errors.document?.number?.message}
                helperText={formState.errors.document?.number?.message}
              />
            </Grid>
          </Grid>
          {!!error && (
            <Grid md={12} sm={12} xs={12} sx={{ mt: 2 }}>
              <ErrorBox>{error}</ErrorBox>
            </Grid>
          )}
          <Grid md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <Grid container spacing={1} sx={{ m: 0, width: '100%', alignItems: 'center' }}>
              <Grid xs={2}>
                <Checkbox sx={{ padding: '0' }} {...register('acceptedNotifications')} />
              </Grid>
              <Grid xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                <P>{t('optIn')}</P>
              </Grid>
            </Grid>
            <H5>{t('acceptTerms')}</H5>
            <BandoButton type="submit" variant="contained" disabled={isMutating} fullWidth>
              {isMutating && <CircularProgress size={16} sx={{ mr: 1, ml: -2, color: '#fff' }} />}
              {t('verifyButton')}
            </BandoButton>
          </Grid>
        </Grid>
      </form>
    </BoxContainer>
  );
}
