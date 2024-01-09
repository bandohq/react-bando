import { ReactNode } from 'react';
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
  width: '100%',
  display: 'flex',
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
  '&.Mui-disabled  .MuiInputBase-input, &.Mui-disabled  .MuiSelect-select': {
    backgroundColor: theme.palette.ink.i100,
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
  '& .MuiSelect-select': { paddingRight: '32px !important' },
}));

export const HelpText = styled(Box)(({ theme }) => ({
  color: theme.palette.ink.i500,
  fontSize: '14px',
  marginTop: 4,
}));

export default function Input({
  label,
  helpText = '',
  mantainLabel = true,
  fullWidth = true,
  ...props
}: InputProps) {
  return (
    <FormControl variant="standard">
      {(!!label || mantainLabel) && (
        <InputLabel shrink htmlFor={props.id} aria-label={props.id}>
          {label}
        </InputLabel>
      )}
      <TextFieldInput fullWidth={fullWidth} {...props} />
      {!!helpText && <HelpText>{helpText}</HelpText>}
    </FormControl>
  );
}
