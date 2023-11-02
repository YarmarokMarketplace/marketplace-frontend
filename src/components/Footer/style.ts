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

export const LogoContainer = styled(Box)({
  maxWidth: '17%',
});

export const Logo = styled('img')({
  maxWidth: '100%',
});

export const LinksContainer = styled(Box)(({ theme }) => ({
  maxWidth: '85%',
  display: 'flex',
  gap: theme.spacing(3),
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
  width: '100%',
  textAlign: 'center',
  color: theme.palette.white,
}));
