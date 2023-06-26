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

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <Logo src={logo} alt="Логотип" />
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
  );
};

export default Footer;
