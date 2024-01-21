import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.secBlack.dark,
  padding: theme.spacing(5, 7.5),
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.white,
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  width: '17%',
  [theme.breakpoints.down('md')]: {
    width: '30%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50%',
  },
}));

export const Logo = styled('img')({
  maxWidth: '100%',
});

export const LinksContainer = styled(Box)(({ theme }) => ({
  maxWidth: '78%',
  display: 'flex',
  gap: theme.spacing(3),
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.palette.white,
  display: 'block',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  ':hover': {
    color: theme.palette.primary.main,
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  textAlign: 'center',
  color: theme.palette.white,
  [theme.breakpoints.down('md')]: {
    width: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
