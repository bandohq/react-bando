import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';

import CaretGreen from '../../assets/CaretGreen.svg';
import CaretWhite from '../../assets/CaretWhite.svg';

type i18nSwitcherProps = {
  isOnTop?: boolean;
};

const menuItemSx = { fontSize: '14px !important', gap: 1, color: 'ink.i400', fontWeight: 200 };

const languageOptions = [
  {
    id: 'en',
    name: 'English',
    flagimg:
      'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg',
  },
  {
    id: 'es',
    name: 'Español',
    flagimg: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Flag_of_Mexico_%283-2%29.svg',
  },
];

const FlagImg = styled('img')({
  width: '24px',
  marginRight: '8px',
});

export default function I18nSwitcher(props: i18nSwitcherProps) {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        id="i18n-nav-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={false}
        sx={{ textTransform: 'none', fontWeight: 400, display: 'flex', gap: 1 }}
      >
        <TranslateIcon
          style={{
            color: props.isOnTop ? theme.palette.primary.main : theme.palette.primary.contrastText,
            fontSize: '23px',
          }}
        />
        <img style={{ width: '8px' }} src={props.isOnTop ? CaretGreen : CaretWhite} alt="Caret" />
      </Button>
      <Menu
        id="i18n-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: '100%' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {languageOptions.map((lang) => (
          <MenuItem
            key={lang.id}
            sx={{
              ...menuItemSx,
            }}
            onClick={() => handleLanguageChange(lang.id)}
          >
            <FlagImg src={lang.flagimg} alt={lang.name} />
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
