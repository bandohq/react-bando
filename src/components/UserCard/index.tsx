import Typography from '@mui/material/Typography';
import Box, { BoxProps } from '@mui/material/Box';
import { User } from '../../hooks/useUser/MagicUserProvider';
import { styled } from '@mui/material/styles';

type UserCardProps = {
  user: Partial<User> | null;
};

const UserCardBox = styled(Box)<BoxProps>(({ theme }) => ({
  '& h5': {
    fontWeight: 700,
  },
  '& p': {
    color: theme.palette.ink.i600,
  },
}));

function UserCard(props: UserCardProps) {
  return (
    <UserCardBox sx={{ mt: 3 }} id="user-drawer-card">
      <Typography variant="h5">{`${props.user?.firstName} ${props.user?.lastName}`}</Typography>
      <Typography variant="body1">{props.user?.email}</Typography>
    </UserCardBox>
  );
}

export default UserCard;
