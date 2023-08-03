import React from "react";

import {
  FooterContainer,
  LogoContainer,
  Logo,
  LinksContainer,
  CustomLink,
  Text,
} from "./style";

import logo from "../../img/logo.png";
import { Container, Stack } from "@mui/material";

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth={false} disableGutters sx={{ maxWidth: 1320 }}>
        <Stack direction="row" justifyContent="space-between">
          <LogoContainer>
            <Logo src={logo} alt="Логотип" />
          </LogoContainer>

          <LinksContainer>
            <CustomLink href="#">Умови використання</CustomLink>
            <CustomLink href="#">Як продавати й купувати?</CustomLink>
            <CustomLink href="#">Правила безпеки</CustomLink>
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
