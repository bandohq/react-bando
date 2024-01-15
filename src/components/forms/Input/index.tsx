import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { Box } from '@mui/material';
import FormControlBase from '@mui/material/FormControl';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import InputLabelBase from '@mui/material/InputLabel';
import { alpha, styled } from '@mui/material/styles';

export type InputProps = InputBaseProps & {
  label?: string;
  mantainLabel?: boolean;
  helpText?: ReactNode;
};

export const FormControl = styled(FormControlBase)(({ theme }) => ({
  display: 'flex',
  width: 'auto',
  '& label': {
    fontSize: '16px',
    lineHeight: 'normal',
    marginBottom: '0.5rem',
    fontWeight: 'normal',
    color: theme.palette.ink.i700,
    fontFamily: 'TWK Everett',
  },
}));

export const InputLabel = styled(InputLabelBase)(() => ({
  transform: 'none',
}));

export const TextFieldInput = styled(InputBase)(({ theme }) => ({
  lineHeight: 'normal',
  fontSize: '16px',
  'label + &': {
    marginTop: theme.spacing(3.5),
  },
  '&.rounded': {
    '& .MuiInputBase-input, & .MuiSelect-select': {
      borderRadius: '100px',
      '&:focus': {
        borderRadius: '100px',
      },
    },
  },
  '& .MuiInputBase-input, & .MuiSelect-select': {
    borderRadius: 4,
    fontSize: '16px',
    position: 'relative',
    backgroundColor: theme.palette.primary.contrastText,
    border: '1px solid',
    borderColor: theme.palette.ink.i300,
    padding: theme.spacing(2),
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: 'TWK Everett',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      borderRadius: 4,
    },
  },
  '&.Mui-error .MuiInputBase-input, &.Mui-error .MuiSelect-select': {
    borderColor: theme.palette.error.main,
    '&:focus': {
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.error.main,
      borderRadius: 4,
    },
  },
  '&.no-border': {
    '& .MuiInputBase-input, & .MuiSelect-select': {
      border: 'none !important',
      padding: 0,
      marginRight: theme.spacing(1),
      fontSize: 'inherit',
    },
  },
  '&.Mui-disabled  .MuiInputBase-input, &.Mui-disabled  .MuiSelect-select': {
    backgroundColor: theme.palette.ink.i100,
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
  '& .MuiSelect-select': { paddingRight: '32px !important' },
}));

export const HelpText = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.ink.i500,
  fontSize: '14px',
  marginTop: 4,
  alignItems: 'center',
}));

const Input = forwardRef((inputProps: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, helpText = '', mantainLabel = true, fullWidth = true, ...props } = inputProps;
  const labelText = props.id ?? props.name;

  return (
    <FormControl variant="standard">
      {!!label && mantainLabel && (
        <InputLabel shrink htmlFor={props.id} id={labelText} aria-label={label}>
          {label}
        </InputLabel>
      )}
      <TextFieldInput
        fullWidth={fullWidth}
        {...props}
        ref={ref}
        inputProps={{ ...props.inputProps, 'aria-label': labelText }}
      />
      {!!helpText && <HelpText>{helpText}</HelpText>}
    </FormControl>
  );
});

export default Input;
