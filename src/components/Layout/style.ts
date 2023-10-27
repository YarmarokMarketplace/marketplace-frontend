import { Container, styled } from '@mui/material';

export const MainContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(0, 7.5),
  maxWidth: 1440,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2),
  },
}));
