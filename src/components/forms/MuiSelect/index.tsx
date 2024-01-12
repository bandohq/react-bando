import { CustomSelectProps } from '../Select';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import MenuItemBase from '@mui/material/MenuItem';

import { ForwardedRef, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import CaretDown from '../../../assets/caret-down.svg';
import inputStyles from '../MuiInput/styles';

export const TextFieldBase = styled(TextField)<TextFieldProps>(() => inputStyles);
const MenuItem = styled(MenuItemBase)(() => ({
  fontSize: '16px !important',
  padding: '16px',
}));

const CaretImg = styled('img')(() => ({
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

export type MuiSelectProps = TextFieldProps & CustomSelectProps;

const MuiSelect = forwardRef((inputProps: MuiSelectProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { mantainLabel = true, fullWidth = true, className, items, ...props } = inputProps;
  const classNames = mantainLabel ? 'label-top' : '';

  return (
    <TextFieldBase
      className={`${classNames} ${className}`}
      ref={ref}
      fullWidth={fullWidth}
      {...props}
      SelectProps={{
        IconComponent: () => <CaretImg src={CaretDown} />,
      }}
      select
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
            {item.endComponent}
          </>
        </MenuItem>
      ))}
    </TextFieldBase>
  );
});

export default MuiSelect;
