import { Box, List, Button, Typography, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const MenuContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(39),
  borderRadius: 20,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.white,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
}));

export const StyledLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.divider,
  ':hover': {
    color: theme.palette.text.disabled,
  },
  '&.active': {
    color: theme.palette.primary.main,
    pointerEvents: 'none',
    fontWeight: 700,
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.divider,
  marginLeft: '-.5rem',
}));

export const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  position: 'relative',
  overflow: 'auto',
  maxHeight: 185,
  paddingTop: 0,
  paddingBottom: 0,
  borderTop: `1px solid ${theme.palette.lightGrey.dark}`,
}));

export const StyledAdsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
}));

export const StyledTitleContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 20,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.white,
  width: '100%',

  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
}));

export const BoxShadowContainer = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.white,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
}));

export const NoAdsContainer = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  marginBottom: theme.spacing(8),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.white,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  img: {
    width: theme.spacing(27.5),
  },
}));

export const GridProductsWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  width: '100%',

  // gridGap: theme.spacing(2),
  //   marginBottom: theme.spacing(8),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr 1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

export const StyledNotification = styled(Badge)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  '.MuiBadge-badge': {
    top: '50%',
  },
}));

export const StyledProfileContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '0.3fr 1fr',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
  gap: '1.5rem',
}));
