import 'react-international-phone/style.css';
import MuiInput, { MuiInputProps } from '.';

import { InputAdornment, MenuItem, Select, Typography } from '@mui/material';
import {
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
  PhoneInputProps,
} from 'react-international-phone';
import { Ref } from 'react';

type MuiPhoneProps = PhoneInputProps & MuiInputProps;

export default function MuiPhoneInput({
  value,
  onChange,
  defaultCountry,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  forceDialCode,
  ...restProps
}: MuiPhoneProps) {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } = usePhoneInput({
    defaultCountry,
    value,
    disableDialCodePrefill: false,
    countries: defaultCountries,
    onChange: (data) => {
      onChange?.(data.phone, data);
    },
  });

  const ref = inputRef as unknown as Ref<HTMLInputElement>;

  return (
    <MuiInput
      variant="outlined"
      label="Phone number"
      color="primary"
      placeholder="Phone number"
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" style={{ marginRight: '2px', marginLeft: '-8px' }}>
            <Select
              MenuProps={{
                style: {
                  height: '300px',
                  width: '360px',
                  top: '10px',
                  left: '-34px',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              sx={{
                width: 'max-content',
                fieldset: {
                  display: 'none',
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: 'block',
                  },
                },
                '.MuiSelect-select': {
                  padding: '8px',
                  paddingRight: '24px !important',
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => <FlagImage iso2={value} style={{ display: 'flex' }} />}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagImage iso2={country.iso2} style={{ marginRight: '8px' }} />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
      }}
      mantainLabel={false}
      {...restProps}
      ref={ref}
    />
  );
}
