import usePlacesAutocomplete, { getDetails } from 'use-places-autocomplete';
import { MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput, { MuiInputProps } from '../MuiInput';
import parse from 'autosuggest-highlight/parse';
import CaretDown from '../../../assets/caret-down.svg';
import { styled } from '@mui/material/styles';

const ArrowCont = styled('span')(() => ({
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ArrowImg = styled('img')(({ theme }) => ({
  width: '18px',
  height: '10px',
  color: theme.palette.ink.i300,
}));

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}

type AddressParts = {
  street: string;
  city: string;
  zip: string;
  country: string;
};
type PlacesAutocompleteProps = MuiInputProps & {
  setInputValue: (value: string, address?: AddressParts) => void;
  noOptionsText: string;
};

type AddressResults = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
};

export default function PlacesAutocomplete({
  setInputValue,
  noOptionsText,
  ...props
}: PlacesAutocompleteProps) {
  const { ready, suggestions, clearSuggestions, setValue } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });

  if (!ready) return null;

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: '100%' }}
      getOptionLabel={(option: PlaceType) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={suggestions.data}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={props.value as PlaceType}
      isOptionEqualToValue={(option) => option?.description === (props.value as unknown as string)}
      noOptionsText={noOptionsText}
      onInputChange={(_, newInputValue) => {
        setValue(newInputValue);
        setInputValue(newInputValue);
      }}
      popupIcon={
        <ArrowCont>
          <ArrowImg src={CaretDown} />
        </ArrowCont>
      }
      renderInput={(params) => <MuiInput {...params} label={props.label} autoComplete="off" />}
      renderOption={(optionProps, option) => {
        const opt = option as PlaceType;
        const matches = opt?.structured_formatting?.main_text_matched_substrings || [];

        const parts = parse(
          opt?.structured_formatting?.main_text,
          matches.map((match: MainTextMatchedSubstrings) => [
            match?.offset,
            match?.offset + match?.length,
          ]),
        );

        const onClick = (e: MouseEvent<HTMLLIElement>) => {
          optionProps?.onClick?.(e);

          getDetails({ placeId: opt.place_id }).then((results: AddressResults) => {
            const addressParts = results.address_components;
            const streetRoute =
              addressParts.find((result) => result.types.includes('route'))?.long_name ?? '';
            const streetNumber =
              addressParts.find((result) => result.types.includes('street_number'))?.long_name ??
              '';
            const city =
              addressParts.find((result) => result.types.includes('locality'))?.long_name ?? '';
            const zip =
              addressParts.find((result) => result.types.includes('postal_code'))?.long_name ?? '';
            const country =
              addressParts.find((result) => result.types.includes('country'))?.short_name ?? '';
            const street = [streetRoute, streetNumber].join(' ');

            setInputValue(opt.description, {
              street,
              city,
              zip,
              country,
            });

            clearSuggestions();
          });
        };

        const liOptions = { ...optionProps, onClick };

        return (
          <li {...liOptions}>
            <Grid container alignItems="center">
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {opt?.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
