import { Box, Container, ListItem, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { theme } from 'src/theme';

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '61.5rem 19.5rem',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
  gap: theme.spacing(4),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(8),
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: 500,
  '&.active': {
    color: theme.palette.primary.main,
    pointerEvents: 'none',
    fontWeight: 700,
  },
  ':hover': {
    color: theme.palette.secondary.main,
  },
  '::before': {
    content: '"\\2022"',
    marginRight: '0.5rem',
  },
}));

export const StyledListContentItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.75rem',
  fontWeight: 500,
  display: 'list-item',
  padding: theme.spacing(1),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  fontWeight: 600,
  display: 'list-item',
  padding: theme.spacing(1),
  paddingTop: theme.spacing(0),
  marginLeft: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '95%',
  },
}));

export const StyledListTabletContentItem = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.75rem',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  borderRadius: '8px',
  background: theme.palette.white,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  p: {
    '::before': {
      content: '"\\2022"',
      marginRight: '0.5rem',
    },
  },
  ':hover': {
    background: theme.palette.primary.contrastText,
    cursor: 'pointer',
  },
}));

export const HowToContainer = styled(Container)(({ theme }) => ({
  img: {
    width: '100%',
  },
  [theme.breakpoints.down('lg')]: {
    img: {
      width: '75%',
    },
  },

  [theme.breakpoints.down('md')]: {
    img: {
      width: '100%',
    },
  },
}));
