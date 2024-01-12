import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ForwardedRef, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import inputStyles from './styles';

export const TextFieldBase = styled(TextField)<TextFieldProps>(() => inputStyles);

export type MuiInputProps = TextFieldProps & {
  mantainLabel?: boolean;
};

const MuiInput = forwardRef((inputProps: MuiInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { mantainLabel = true, fullWidth = true, className, ...props } = inputProps;
  const classNames = mantainLabel ? 'label-top' : '';

  return (
    <TextFieldBase
      className={`${classNames} ${className}`}
      ref={ref}
      fullWidth={fullWidth}
      {...props}
    />
  );
});

export default MuiInput;
