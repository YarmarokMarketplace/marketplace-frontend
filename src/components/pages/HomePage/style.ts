import {
  Box,
  Card,
  CardContent,
  Container,
  Skeleton,
  Stack,
  styled,
} from '@mui/material';

import { Link } from 'react-router-dom';

export const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  // display: 'none',
  textDecoration: 'none',
  fontSize: '1.125rem',
  fontWeight: 500,
  color: theme.palette.primary.main,
  ':hover': {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    fontSize: '1rem',
  },
}));

export const StyledCategoryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
  gridGap: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(8, 1fr)',
    overflowX: 'scroll',
  },
}));

export const StyledItemWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
  '&.list': {
    flexDirection: 'row',
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    justifyContent: 'flex-start',
    borderRadius: theme.spacing(2),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  width: theme.spacing(23.75),
  height: theme.spacing(20),
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(12.5),
    height: theme.spacing(12.5),
  },
  '&.list': {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
}));

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));
export const StyledImage = styled('img')(({ theme }) => ({
  width: '75%',
  height: '100%',
  aspectRatio: 3 / 2,
  objectFit: 'contain',
  '&.help': {
    position: 'absolute',
    left: 0,
  },
  '&.exchange': {
    width: '120%',
    [theme.breakpoints.down('sm')]: {
      width: '150%',
    },
  },
  '&.resize': {
    height: '65%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    borderRadius: '50%',
  },
  boxShadow: 'none',
  ':hover ~': {
    a: {
      color: theme.palette.primary.main,
    },
  },
}));

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(5),
  width: theme.spacing(23.75),
  height: theme.spacing(20),
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(12.5),
    height: theme.spacing(12.5),
  },
}));

export const StyledTextSkeleton = styled(Skeleton)(({ theme }) => ({
  height: theme.spacing(6.875),
  width: theme.spacing(23.75),
  [theme.breakpoints.down('sm')]: {
    height: theme.spacing(3),
    width: theme.spacing(12.5),
  },
}));

export const StyledCategoryLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '1.125rem',
  fontWeight: 500,
  minHeight: theme.spacing(6.875),
  maxWidth: theme.spacing(23.75),
  color: theme.palette.text.primary,
  ':hover': {
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
  '&.list': {
    maxWidth: 'fit-content',
    minHeight: theme.spacing(3),
  },
}));

export const StyledModalBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  maxHeight: '100vh',
  width: '100vw',
  overflowY: 'auto',
  backgroundColor: theme.palette.white,
  padding: theme.spacing(2, 3, 6),
}));
