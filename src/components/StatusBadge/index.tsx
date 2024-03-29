import StatusCircle from '@components/StatusCircle';
import Typography from '@mui/material/Typography';

import { styled, alpha } from '@mui/material/styles';
import { ComponentProps } from 'react';

const StatusBadgeContainer = styled('span')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  backgroundColor: theme.palette.ink.i100,
  padding: theme.spacing(1, 2),
  borderRadius: '100px',
  paddingRight: theme.spacing(4),
  '&.pending': {
    backgroundColor: `${alpha(theme.palette.warning.light, 0.35)}`,
    color: theme.palette.ink.i600,
    border: `1px solid ${theme.palette.warning.light}`,
  },
  '&.error': {
    backgroundColor: `${alpha(theme.palette.error.light, 0.35)}`,
    color: theme.palette.ink.i600,
    border: `1px solid ${theme.palette.error.light}`,
  },
  '&.success': {
    backgroundColor: `${alpha(theme.palette.success.light, 0.35)}`,
    color: theme.palette.ink.i600,
    border: `1px solid ${theme.palette.success.light}`,
  },
  '&.info': {
    backgroundColor: `${alpha(theme.palette.info.light, 0.35)}`,
    color: theme.palette.ink.i600,
    border: `1px solid ${theme.palette.info.light}`,
  },
  '&.simple': {
    backgroundColor: 'transparent',
    color: theme.palette.ink.i600,
    border: 'none',
  },
}));

const StatusText = styled(Typography)(() => ({
  textAlign: 'right',
  fontSize: 'inherit',
  width: '100%',
}));

const BadgeStatusCircle = styled(StatusCircle)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
}));

type StatusBadgeProps = Partial<ComponentProps<typeof StatusBadgeContainer>> & {
  statusCircleProps?: ComponentProps<typeof StatusCircle>;
  color: string;
  text: string;
  hideBeacon?: boolean;
  showPulse?: boolean;
  hideShadow?: boolean;
  variant?: 'default' | 'light';
};

export default function StatusBadge({
  color,
  text,
  statusCircleProps,
  hideBeacon = false,
  showPulse = false,
  hideShadow = false,
  variant = 'default',
  ...props
}: StatusBadgeProps) {
  return (
    <StatusBadgeContainer {...props} className={`${color} ${props.className}`}>
      <StatusText variant="body2">{text} </StatusText>{' '}
      {!hideBeacon && color && (
        <BadgeStatusCircle
          className={`${color} ${props.className} ${variant} ${showPulse ? 'pulse' : ''} ${
            hideShadow ? 'no-shadow' : ''
          }`}
          {...statusCircleProps}
        />
      )}
    </StatusBadgeContainer>
  );
}
