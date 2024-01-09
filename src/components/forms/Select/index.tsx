import SelectBase, { SelectProps as SelectBaseProps } from '@mui/material/Select';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';

import { TextFieldInput, InputLabel, FormControl, HelpText } from '@components/forms/Input';
import MenuItemBase from '@mui/material/MenuItem';
import CaretDown from '../../../assets/caret-down.svg';

export type SelectProps = SelectBaseProps & {
  mantainLabel?: boolean;
  helpText?: ReactNode;
  items: {
    label: string;
    value: string | number;
    startComponent?: ReactNode;
    endComponent?: ReactNode;
  }[];
};

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

export default function Select({
  label,
  helpText = '',
  mantainLabel = true,
  items,
  ...props
}: SelectProps) {
  return (
    <FormControl variant="standard">
      {(!!label || mantainLabel) && (
        <InputLabel shrink htmlFor={props.id} aria-label={props.id}>
          {label}
        </InputLabel>
      )}
      <SelectBase
        input={<TextFieldInput />}
        aria-label={`container-${props.name}`}
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
              {item.endComponent}
            </>
          </MenuItem>
        ))}
      </SelectBase>
      {!!helpText && <HelpText>{helpText}</HelpText>}
    </FormControl>
  );
}
