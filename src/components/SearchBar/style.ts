import { Box, Button, Stack, TextField, styled } from '@mui/material';
import logo from '../../img/logo.png';

export const SearchWrapper = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 0, 1, 2),
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '1rem',
  },
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 5),
  position: 'absolute',
  right: theme.spacing(3),
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  '.MuiInputBase-root': {
    height: theme.spacing(10),
    borderRadius: 16,
  },
  '.MuiOutlinedInput-root': {
    fieldset: {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.disabled,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const SearchSmButton = styled(Button)(({ theme }) => ({
  background: `no-repeat center/30% url(${logo})`,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  height: theme.spacing(6),
  justifyContent: 'flex-start',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  maxHeight: '100vh',
  width: '100vw',
  overflowY: 'auto',
  backgroundColor: theme.palette.white,
  padding: theme.spacing(2, 3, 6),
}));

export const ProfileButton = styled(Button)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  // padding: theme.spacing(1, 5),
  position: 'absolute',
  right: theme.spacing(0.5),
  width: theme.spacing(0.5),
  '& .MuiButton-startIcon': {
    margin: 0,
  },
}));
