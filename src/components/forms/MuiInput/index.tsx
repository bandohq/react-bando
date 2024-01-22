import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ForwardedRef, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import inputStyles from './styles';

const TextFieldBase = styled(TextField)<TextFieldProps>(() => inputStyles);

export type MuiInputProps = TextFieldProps & {
  mantainLabel?: boolean;
};

const MuiInput = forwardRef((inputProps: MuiInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { mantainLabel = false, fullWidth = true, className, ...props } = inputProps;
  const classNames = mantainLabel ? 'label-top' : '';
  const labelText = props.id ?? props.name;

  return (
    <TextFieldBase
      className={`${classNames} ${className}`}
      InputLabelProps={{ htmlFor: props.id, id: labelText }}
      InputProps={{ 'aria-label': labelText }}
      ref={ref}
      fullWidth={fullWidth}
      {...props}
    />
  );
});

export default MuiInput;
