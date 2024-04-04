import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

const StatusCircle = styled(Box)(({ theme }) => ({
  '@keyframes pulse-ring': {
    '0%': {
      transform: 'scale(.33)',
    },
    '80%, 100%': {
      opacity: 0,
    },
  },
  '@keyframes pulse-dot': {
    '0%': {
      transform: 'scale(.8)',
    },
    '50%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(.8)',
    },
  },
  width: theme.spacing(2),
  height: theme.spacing(2),
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'relative',
    display: 'none',
    width: '300%',
    height: '300%',
    boxSizing: 'border-box',
    marginLeft: '-100%',
    marginTop: '-100%',
    borderRadius: '45px',
    backgroundColor: theme.palette.secondary.main,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: `${alpha(theme.palette.primary.main, 0.55)}`,
    borderRadius: '15px',
    boxShadow: '0 0 8px rgba(0,0,0,.3)',
  },
  '&.no-shadow:after': {
    boxShadow: 'none',
  },
  '&.pulse': {
    '&:before': {
      display: 'block',
      animation: 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
    },
    '&:after': {
      animation: 'pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite',
    },
    '&.pending:before': {
      backgroundColor: theme.palette.warning.light,
    },
    '&.error:before': {
      backgroundColor: theme.palette.error.light,
    },
    '&.success:before': {
      backgroundColor: theme.palette.success.light,
    },
    '&.info:before': {
      backgroundColor: theme.palette.info.light,
    },
    '&.light.pending:before': {
      backgroundColor: `${alpha(theme.palette.warning.light, 0.95)}`,
    },
    '&.light.error:before': {
      backgroundColor: `${alpha(theme.palette.error.light, 0.95)}`,
    },
    '&.light.success:before': {
      backgroundColor: `${alpha(theme.palette.success.light, 0.95)}`,
    },
    '&.light.info:before': {
      backgroundColor: `${alpha(theme.palette.info.light, 0.95)}`,
    },
  },
  '&.pending': {
    '&:after': {
      backgroundColor: `${alpha(theme.palette.warning.light, 0.95)}`,
    },
    '&.light:after': {
      backgroundColor: `${alpha(theme.palette.warning.light, 0.85)}`,
    },
  },
  '&.error': {
    '&:after': {
      backgroundColor: `${alpha(theme.palette.error.dark, 0.95)}`,
    },
    '&.light:after': {
      backgroundColor: `${alpha(theme.palette.error.light, 0.92)}`,
    },
  },
  '&.success': {
    '&:after': {
      backgroundColor: `${alpha(theme.palette.success.dark, 0.95)}`,
    },
    '&.light:after': {
      backgroundColor: `${alpha(theme.palette.success.light, 0.92)}`,
    },
  },
  '&.info': {
    '&:after': {
      backgroundColor: `${alpha(theme.palette.info.dark, 0.95)}`,
    },
    '&.light:after': {
      backgroundColor: `${alpha(theme.palette.info.light, 0.92)}`,
    },
  },
}));

export default StatusCircle;
