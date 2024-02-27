import SelectBase, { SelectProps as SelectBaseProps } from '@mui/material/Select';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { styled } from '@mui/material/styles';

import {
  TextFieldInput,
  InputLabel as InputLabelBase,
  FormControl,
  HelpText,
} from '@components/forms/Input';
import MenuItemBase from '@mui/material/MenuItem';
import CaretDown from '../../../assets/CaretDown.svg';

export type CustomSelectProps = {
  mantainLabel?: boolean;
  helpText?: ReactNode;
  items: {
    label: string;
    value: string | number;
    startComponent?: ReactNode;
    endComponent?: ReactNode;
  }[];
};
export type SelectProps = SelectBaseProps & CustomSelectProps;

export const MenuItem = styled(MenuItemBase)(() => ({
  fontSize: '16px !important',
  padding: '16px',
}));

export const InputLabel = styled(InputLabelBase)(({ theme }) => ({
  '& .hide-label': {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export const CaretImg = styled('img')(() => ({
  userSelect: 'none',
  width: '18px',
  height: '10px',
  display: 'inline-block',
  fill: 'currentColor',
  position: 'absolute',
  right: '12px',
  top: 'calc(50% - 4px)',
  pointerEvents: 'none',
  color: 'rgba(0, 0, 0, 0.54)',
  flexShrink: 0,
}));

const Select = forwardRef((selectProps: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
  const { label, helpText = '', mantainLabel = true, items, ...props } = selectProps;
  const labelText = props.id ?? props.name;
  const labelClass = !label && mantainLabel ? 'hide-label' : '';

  return (
    <FormControl variant="standard">
      {(!!label || mantainLabel) && (
        <InputLabel shrink htmlFor={props.id} id={labelText} className={labelClass}>
          {label}
        </InputLabel>
      )}
      <SelectBase
        ref={ref}
        input={<TextFieldInput />}
        inputProps={{ ...props.inputProps, 'aria-label': labelText }}
        IconComponent={() => <CaretImg src={CaretDown} />}
        {...props}
      >
        {items.map((item) => (
          <MenuItem
            key={`select-menuItem-${item.label}-${item.value}`}
            value={item.value}
            aria-label={item.label}
          >
            <>
              {item.startComponent}
              {item.label}
            </>
          </MenuItem>
        ))}
      </SelectBase>
      {!!helpText && <HelpText>{helpText}</HelpText>}
    </FormControl>
  );
});

export default Select;
