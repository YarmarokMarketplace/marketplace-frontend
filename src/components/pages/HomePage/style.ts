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
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
  textDecoration: 'none',
  fontSize: '1.125rem',
  fontWeight: 500,
  color: theme.palette.primary.main,
  ':hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledCategoryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(12rem, 1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(8, 1fr))',
    overflow: 'scroll',
  },
  gridGap: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(8),
}));

export const StyledItemWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  width: theme.spacing(23.75),
  height: theme.spacing(20),
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(11.75),
    height: theme.spacing(10),
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
  },
  '&.resize': {
    height: '65%',
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
}));

export const StyledTextSkeleton = styled(Skeleton)(({ theme }) => ({
  height: theme.spacing(6.875),
  width: theme.spacing(23.75),
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
}));
