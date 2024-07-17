import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

type ErrorBoxProps = BoxProps & {
  mode?: 'error' | 'alert';
  align?: 'center' | 'left' | 'right';
};

const ErrorBox = styled(Box)<ErrorBoxProps>(({ theme, mode, align }) => {
  if (align) align = align === 'center' ? 'center' : align === 'left' ? 'left' : 'right';
  else align = 'center';
  let color = theme.palette.error.main;
  if (mode) color = mode === 'error' ? theme.palette.error.main : theme.palette.info.main;
  return {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    borderRadius: '6px',
    color: color,
    backgroundColor: theme.palette.error.contrastText,
    border: `1px solid ${color}`,
    textAlign: align,
  };
});

export default ErrorBox;
