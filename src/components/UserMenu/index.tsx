import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUser from '@hooks/useUser';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CaretGreen from '../../assets/CaretGreen.svg';
import LogoutIcon from '@components/Svgs/Logout';

export default function UserMenu() {
  const { t } = useTranslation('userMenu');
  const { user, removeSessionStorage, isLoginOut } = useUser();
  const { pathname } = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await removeSessionStorage();
    navigate('/');
  };

  const handleLoginClick = async () => {
    navigate('/signin');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user?.email)
    if (pathname === '/signin') return null;
    else
      return (
        <Box>
          <Button
            id="login-button"
            onClick={handleLoginClick}
            sx={{ textTransform: 'none', fontWeight: 700, display: 'flex', gap: 1 }}
          >
            {t('signin')}
          </Button>
        </Box>
      );
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={isLoginOut}
        sx={{ textTransform: 'none', fontWeight: 400, display: 'flex', gap: 1 }}
      >
        {user?.email}
        <img src={CaretGreen} alt="Caret" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ width: '100%' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={logoutUser} sx={{ fontSize: '16px !important', gap: 1 }}>
          {t('signout')} <LogoutIcon strokeWidth={1.5} sx={{ color: 'inherit' }} />
        </MenuItem>
      </Menu>
    </Box>
  );
}
