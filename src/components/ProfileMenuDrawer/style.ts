import { Drawer, Box, Button, styled } from '@mui/material';

export const StyledCustomDrawer = styled(Drawer)(({ theme }) => ({
  display: 'flex',
  '.MuiDrawer-paperAnchorRight': {
    backgroundColor: theme.palette.lightGrey.light,
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      padding: theme.spacing(3),
    },
  },
}));

export const StyledNavigateButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.divider,
  ':hover': {
    color: theme.palette.text.disabled,
  },
}));

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
}));
export const StyledImage = styled('img')(({ theme }) => ({
  width: theme.spacing(5.25),
  borderRadius: '60rem',
}));
