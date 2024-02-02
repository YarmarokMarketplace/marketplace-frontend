import {
  Container,
  styled,
  Box,
  IconButton,
  Button,
  Tab,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  maxWidth: 1440,
}));
export const StyledCurrentImage = styled(Box)(({ theme }) => ({
  height: '42rem',
  display: 'flex',
  alignItems: 'center',
  border: '2px solid transparent',
  img: {
    borderRadius: 12,
    width: '100%',
    maxHeight: '100%',
  },
}));

export const StyledIndicator = styled('img')(({ theme }) => ({
  width: 108,
  height: 90,
  objectFit: 'cover',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    height: 110,
  },
}));

export const StyledInfoBlock = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  borderRadius: 12,
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(1),
  borderColor: theme.palette.secondary.light,
  ':hover': {
    backgroundColor: theme.palette.primary.contrastText,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontSize: '0.875rem',
}));

export const StyledShowButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  ':hover': {
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const StyledDescBlock = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  borderRadius: '0px 24px 24px 24px',
  textAlign: 'justify',
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.primary.contrastText,
  fontSize: '1.125rem',
  fontWeight: 700,
  pointerEvents: 'none',
  width: '33%',
  padding: theme.spacing(2, 0),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    width: '45%',
  },
}));

export const StyledCarouselWrapper = styled(Stack)(({ theme, hidden }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.white,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  borderRadius: 24,
  height: '100%',
  width: '100%',
  display: hidden ? 'none' : '',
  [theme.breakpoints.down('sm')]: {
    display: hidden ? 'none' : 'flex',
    flexDirection: 'row',
    gap: '12px',
    overflow: 'auto',
    minHeight: '333px',
  },
}));

export const StyledProductWrapper = styled(Container)(({ theme, hidden }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(580px, 1.2fr) minmax(520px, 0.9fr)',
  gridGap: theme.spacing(3),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const StyledCrumpsLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.secondary.main,
  ':hover': {
    textDecoration: 'underline',
  },
}));

export const StyledInfoProductWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(2, 0, 2, 2.5),
  marginBottom: theme.spacing(4),
}));

export const StyledTextButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.primary,
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  ':hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

export const StyledImage = styled('img')(({ theme }) => ({
  borderRadius: 12,
  height: '300px',
  objectFit: 'cover',
}));

export const StyledChatButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 12,
  padding: theme.spacing(1, 2),
}));

export const StyledBuyButton = styled(Button)(({ theme }) => ({
  width: theme.spacing(12.5),
  fontSize: '1.125rem',
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(22),
  },
  [theme.breakpoints.only('xs')]: {
    width: theme.spacing(15),
  },
}));
