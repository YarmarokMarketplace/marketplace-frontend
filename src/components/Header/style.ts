import {
  AppBar,
  Button,
  Toolbar,
  styled,
  IconButton,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  justifyContent: 'center',
  padding: theme.spacing(2, 0),
  backgroundColor: 'transparent',
}));

export const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 16,
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.background.paper,
}));
export const StyledLogo = styled('img')(({ theme }) => ({
  width: '100%',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  ':hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(1),
  borderColor: theme.palette.secondary.light,
}));

export const CustomDivider = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  height: theme.spacing(2.5),
}));

export const StyledLink = styled(NavLink)(({ theme }) => ({
  width: '55%',
  display: 'flex',
  '&.active': {
    pointerEvents: 'none',
  },
}));

export const StyledTextButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  fontWeight: 400,
  ':hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));
