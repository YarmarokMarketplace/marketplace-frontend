import {
  Box,
  Button,
  FormLabel,
  FormControlLabel,
  TextField,
  styled,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.white,
  width: '22.6rem',
  display: 'flex',
  gap: theme.spacing(3),
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    width: '100% !important',
    backgroundColor: theme.palette.lightGrey.light,
  },
}));

export const StyledLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  '.MuiInputBase-root': {
    borderRadius: 8,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  ':hover': {
    color: theme.palette.primary.light,
  },
}));

export const StyledResetBtn = styled('p')(({ theme }) => ({
  margin: 0,
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 700,
  textDecoration: 'none',
  color: theme.palette.primary.main,
  ':hover': {
    color: theme.palette.primary.light,
  },
}));

export const StyledSubmitBtn = styled(Button)(({ theme }) => ({
  width: '90%',
  marginTop: theme.spacing(1),
  fontSize: '0.875rem',
  fontWeight: 600,
  padding: theme.spacing(1, 0),
  [theme.breakpoints.down('sm')]: {
    width: '95%',
  },
}));

export const StyledSignInBtn = styled(Button)(({ theme }) => ({
  fontSize: '0.75rem',
  ':hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.light,
  },
}));

export const SaveDataControlLabel = styled(FormControlLabel)(({ theme }) => ({
  alignSelf: 'start',
  marginLeft: theme.spacing(1),
}));
export const StyledLoginBtn = styled(Button)(({ theme }) => ({
  ':hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.light,
  },
}));

export const StyledVector = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(4),
  borderRadius: '50%',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(8),
  },
}));

export const StyledBackBtn = styled('p')(({ theme }) => ({
  margin: theme.spacing(0, 0, 0, 0.75),
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 400,
  textDecoration: 'none',
  color: theme.palette.primary.main,
  ':hover': {
    color: theme.palette.primary.light,
  },
}));

export const GoogleButton = styled(Button)(({ theme }) => ({
  minWidth: theme.spacing(5.5),
  backgroundColor: theme.palette.white,
  borderRadius: '12px',
  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08);',
  img: {
    padding: theme.spacing(0.5),
  },
}));

export const StyledChangePassBtn = styled(Button)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  width: '50%',
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    lineHeight: '1.25rem',
  },
}));
