import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, ListItemButtonProps } from '@mui/material';
import styled from '@mui/material/styles/styled';
import useUser from '../../hooks/useUser';

type DrawerLinkProps = {
  to: string;
  icon: React.ReactElement;
  text: string;
};

const DrawerButton = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  color: theme.palette.ink.i900,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function DrawerLink({ to, icon, text }: DrawerLinkProps) {
  const navigate = useNavigate();
  const { removeSessionStorage } = useUser();
  const logoutUser = async () => {
    removeSessionStorage();
    navigate('/');
  };
  return (
    <DrawerButton
      component="button"
      onClick={() => (to === 'logout' ? logoutUser() : navigate(to))}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </DrawerButton>
  );
}

export default DrawerLink;
