import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type RampDirectionTabsProps = {
  handleChange: () => void;
};

export default function RampDirectionTabs({ handleChange }: RampDirectionTabsProps) {
  const [value, setValue] = useState(0);
  const { t } = useTranslation('quote');

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const onChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleChange();
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={onChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs"
      >
        <Tab disableRipple label={t('buy')} {...a11yProps(0)} />
        <Tab disableRipple label={t('sell')} {...a11yProps(1)} />
      </Tabs>
    </Box>
  );
}
