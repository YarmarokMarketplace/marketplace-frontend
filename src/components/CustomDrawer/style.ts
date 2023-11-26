import { Drawer, styled } from '@mui/material';

export const StyledCustomDrawer = styled(Drawer)(({ theme }) => ({
  '.MuiDrawer-paperAnchorRight': {
    width: '25rem',
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.lightGrey.light,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(4, 2),
    },
  },
}));
