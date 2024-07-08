import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUser from '@hooks/useUser';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LimitUsage, { LimitUsageProps } from '@components/LimitUsage';

import CaretGreen from '../../assets/CaretGreen.svg';
import CaretWhite from '../../assets/CaretWhite.svg';

type UserMenuProps = {
  isOnTop?: boolean;
  disabled?: boolean;
};

const menuItemSx = { fontSize: '14px !important', gap: 1, color: 'ink.i400', fontWeight: 200 };

export default function UserMenu(props: UserMenuProps) {
  const { t } = useTranslation('userMenu');
  const { user, removeSessionStorage, isLoginOut } = useUser();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const logoutUser = async () => {
    await removeSessionStorage();
    navigate('/');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user?.email)
    return (
      <Box>
        <Button
          id="user-nav-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disabled={isLoginOut || props.disabled}
          sx={{ textTransform: 'none', fontWeight: 400, display: 'flex', gap: 1 }}
        >
          {user?.email}
          <img src={props.isOnTop ? CaretGreen : CaretWhite} alt="Caret" />
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
          <MenuItem onClick={() => navigate('/transactions')} sx={{ ...menuItemSx, mt: 2 }}>
            {t('viewTxnHistory')}
          </MenuItem>
          <LimitUsage
            usage={user.currentDepositUsageUsd}
            kycLevel={user.kycLevel as LimitUsageProps['kycLevel']}
          />
          <MenuItem onClick={logoutUser} sx={{ ...menuItemSx, mb: 2 }}>
            {t('signout')}
          </MenuItem>
        </Menu>
      </Box>
    );
}
