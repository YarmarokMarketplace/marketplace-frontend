import { Box, Button, Card, Chip, Collapse, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledProductContainer = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.white,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  '.MuiCardActionArea-focusHighlight': {
    background: theme.palette.primary.light,
  },
}));

export const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: '600',
  width: 'fit-content',
  marginTop: theme.spacing(2),
}));

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  width: theme.spacing(15),
  height: theme.spacing(14.5),
  borderRadius: 8,
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const StyledContrastButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  height: 'fit-content',
  padding: theme.spacing(1, 2),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  border: '1px solid',
  borderColor: theme.palette.primary.contrastText,
  height: 'fit-content',
  padding: theme.spacing(1.5),
  ':hover': {
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  fontSize: '1rem',
  fontWeight: 500,
  height: theme.spacing(6),
  ':hover': {
    color: theme.palette.text.secondary,
  },
}));

export const StyledInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.lightGrey.dark}`,
  marginTop: theme.spacing(3),
  padding: theme.spacing(1, 0),
}));
