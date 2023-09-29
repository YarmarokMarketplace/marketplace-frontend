import React from 'react';

import {
  FooterContainer,
  LogoContainer,
  Logo,
  LinksContainer,
  CustomLink,
  Text,
} from './style';

import logo from '../../img/logo.png';
import { Container, Stack } from '@mui/material';

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth={false} disableGutters sx={{ maxWidth: 1320 }}>
        <Stack direction="row" justifyContent="space-between">
          <LogoContainer>
            <Logo src={logo} alt="Логотип" />
          </LogoContainer>

          <LinksContainer>
            <CustomLink
              id="requirements-link"
              href="#/rules/general-requirements"
              target="_blank"
            >
              Умови використання
            </CustomLink>
            <CustomLink
              id="how-to-link"
              href="#/rules/how-to-buy"
              target="_blank"
            >
              Як продавати й купувати?
            </CustomLink>
            <CustomLink
              id="security-rules-link"
              href="#/rules/security-rules"
              target="_blank"
            >
              Правила безпеки
            </CustomLink>
            <CustomLink
              id="requirements-link"
              target="_blank"
              href="#/rules/privacy-policy"
            >
              Політика конфіденційності
            </CustomLink>
          </LinksContainer>
        </Stack>

        <Text variant="body2">
          Всі права захищені та охороняються діючим законодавством України
        </Text>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
