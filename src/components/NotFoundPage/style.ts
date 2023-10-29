import { Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledImg = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(5),
  width: '28rem',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(8, 0),
}));

export const StyledTopTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
    fontWeight: 700,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.125rem',
    fontWeight: 700,
    width: '75%',
  },
}));

export const StyledBottomTypography = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
    width: '75%',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginTop: theme.spacing(5),
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    width: theme.spacing(54),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
