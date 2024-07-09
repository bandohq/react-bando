import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { styled } from '@mui/material/styles';

type ProgressBarProps = {
  progressHeight?: number;
};

const ProgressBar = styled(LinearProgress)<ProgressBarProps>(({ theme, progressHeight = 12 }) => ({
  height: progressHeight,
  borderRadius: progressHeight / 2,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.ink.i200,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: progressHeight / 2,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ProgressBar;
