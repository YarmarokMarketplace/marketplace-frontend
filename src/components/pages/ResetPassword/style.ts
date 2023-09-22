import { Box, Stack, styled } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.white,
  width: '22.6rem',
  display: 'flex',
  gap: theme.spacing(3),
  flexDirection: 'column',
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
}));

export const StyledImg = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(5),
  width: '17.875rem',
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(8, 0),
}));
