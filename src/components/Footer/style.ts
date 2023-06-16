import { Avatar, Box, Stack, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: '#0F192E;',
    padding: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF'
}));

export const LogoContainer = styled(Box)({
    maxWidth: '15%',
})

export const Logo = styled('img')({
    maxWidth: '100%'
});

export const LinksContainer = styled(Box)({
    maxWidth: '55%',
    display: 'flex',
    // alignSelf: 'center',
    // marginRight: 'auto',
});

export const CustomLink = styled(Link)(({ theme }) => ({
    marginRight: theme.spacing(2),
    // color: theme.palette.text.primary,
    color: '#fff',
    display: 'block',
    textDecoration: 'none',
    fontSize: '.9rem'
}));

export const Text = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(4),
    width: '100%',
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    color: '#fff',
}));