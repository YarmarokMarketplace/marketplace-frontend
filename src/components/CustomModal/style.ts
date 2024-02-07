import { IconButton, Box, styled } from '@mui/material';

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '.8rem',
  right: '.8rem',
  [theme.breakpoints.down('sm')]: {
    '& svg': {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '36.75rem',
  backgroundColor: theme.palette.white,
  borderRadius: '32px',
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  padding: theme.spacing(6, 3),
  [theme.breakpoints.down('md')]: {
    minWidth: '0',
    width: '95%',
    padding: theme.spacing(8, 2),
  },
}));
