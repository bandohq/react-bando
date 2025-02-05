import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';

import ProgressBar from '@components/ProgressBar';
import formatNumber from '@helpers/formatNumber';
import { useTranslation, Trans } from 'react-i18next';

export type LimitUsageProps = {
  usage?: number;
  variant?: 'default' | 'compressed';
  kycLevel?: 1 | 2 | 3;
  onboardingStatus: 'ACTIVE' | 'REJECTED' | 'PENDING';
};

const limitByLevel = {
  1: 500,
  2: 9999,
  3: 9999,
  4: 49999,
};

export default function LimitUsage({
  usage = 75,
  kycLevel = 1,
  variant = 'default',
  onboardingStatus = 'PENDING',
}: LimitUsageProps) {
  const limit = limitByLevel[kycLevel];
  const { t } = useTranslation('userMenu');
  const isCompressed = variant === 'compressed';

  return (
    <Box sx={isCompressed ? { width: '100%', py: 2 } : { width: '100%', minWidth: 328, p: 2 }}>
      <Typography
        variant="body2"
        sx={(theme) => ({
          color: `${theme.palette.ink.i400} !important`,
          fontWeight: 200,
          fontSize: '12px',
        })}
      >
        {t('limitUsage.title')}
      </Typography>
      {onboardingStatus !== 'ACTIVE' && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Link href="start" sx={{ fontSize: '0.8rem' }}>
            {t('limitUsage.pendingMessage')}
          </Link>
        </Alert>
      )}
      <Typography
        variant="body2"
        sx={(theme) => ({
          fontSize: isCompressed ? '12px' : '14px',
          fontWeight: 400,
          color: `${theme.palette.ink.i400} !important`,
          pb: 1,
          '& span': {
            fontSize: isCompressed ? '18px' : '26px',
            fontWeight: 500,
            color: 'primary.main',
            '&:first-of-type': { pr: isCompressed ? 0.2 : 0.5 },
            '&:last-of-type': { pl: isCompressed ? 0.2 : 0.5 },
          },
        })}
      >
        <Trans
          t={t}
          i18nKey="limitUsage.total"
          values={{ usage: formatNumber(usage), limit: formatNumber(limit, 0, 0) }}
          components={{ span: <span /> }}
        />
      </Typography>
      <ProgressBar variant="determinate" value={(usage / limit) * 100} />
    </Box>
  );
}
