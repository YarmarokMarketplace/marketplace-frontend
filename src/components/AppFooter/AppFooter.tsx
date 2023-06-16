import React from 'react';

import { Avatar, Box, Stack, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import logo from '../../img/logo.png';

const FooterContainer = styled('footer')(({ theme }) => ({
    backgroundColor: '#0F192E;',
    padding: theme.spacing(5),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF'
}));

const LogoContainer = styled(Box)({
    maxWidth: '15%',
})

const Logo = styled('img')({
    maxWidth: '100%'
});

const LinksContainer = styled(Box)({
    maxWidth: '55%',
    display: 'flex',
    // alignSelf: 'center',
    // marginRight: 'auto',
});

const CustomLink = styled(Link)(({ theme }) => ({
    marginRight: theme.spacing(2),
    // color: theme.palette.text.primary,
    color: '#fff',
    display: 'block',
    textDecoration: 'none',
    fontSize: '.9rem'
}));

const Text = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(4),
    width: '100%',
    textAlign: 'center',
    // color: theme.palette.text.secondary,
    color: '#fff',
}));

const AppFooter = () => {
    return (
        <FooterContainer>
            <LogoContainer>
                <Logo
                    src={logo} alt="Логотип" />
            </LogoContainer>

            <LinksContainer>
                <CustomLink href="#">Умови використання</CustomLink>
                <CustomLink href="#">Як продавати й купувати?</CustomLink>
                <CustomLink href="#">Правила безпеки</CustomLink>
                <CustomLink href="#">Карта сайту</CustomLink>
            </LinksContainer>

            <Text variant="body2">
                Всі права захищені та охороняються діючим законодавством України
            </Text>
        </FooterContainer>
    )
}

export default AppFooter;