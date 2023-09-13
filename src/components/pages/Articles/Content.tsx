import { ListItem, List, Typography } from '@mui/material';
import React from 'react';
import { StyledListContentItem, StyledNavLink } from './style';

export const Content = () => {
  return (
    <List>
      <Typography fontWeight={700} variant="h6">
        Зміст
      </Typography>
      <List sx={{ listStyleType: 'disc', paddingTop: 0, marginLeft: 2 }}>
        <StyledListContentItem>Умови використання</StyledListContentItem>
        <ListItem>
          <StyledNavLink
            id="general-requirements-link"
            to="general-requirements"
          >
            Загальні вимоги
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink id="info-presentation-link" to="info-presentation">
            Подача інформації
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink id="info-content-link" to="info-content">
            Зміст інформації
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink id="prohibited-goods-link" to="prohibited-goods">
            Заборонені товари
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink id="prohibited-services-link" to="prohibited-services">
            Заборонені послуги
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink id="activities-link" to="activities">
            Види діяльності
          </StyledNavLink>
        </ListItem>
      </List>
      <List sx={{ listStyleType: 'disc', paddingTop: 0, marginLeft: 2 }}>
        <StyledListContentItem>
          Посібник з покупок на Yarmarok
        </StyledListContentItem>
        <ListItem>
          <StyledNavLink id="how-to-buy-link" to="how-to-buy">
            Як купувати на Yarmarok
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink id="how-to-sell-link" to="how-to-sell">
            Як продавати на Yarmarok
          </StyledNavLink>
        </ListItem>
      </List>
      <List sx={{ listStyleType: 'disc', paddingTop: 0, marginLeft: 2 }}>
        <StyledListContentItem>Правила безпеки</StyledListContentItem>
        <ListItem>
          <StyledNavLink id="security-rules-link" to="security-rules">
            Як захистити себе при купівлі товарів через Інтернет
          </StyledNavLink>
        </ListItem>
      </List>
      <List sx={{ listStyleType: 'disc', paddingTop: 0, marginLeft: 2 }}>
        <StyledListContentItem>Політика конфіденційності</StyledListContentItem>
        <ListItem>
          <StyledNavLink id="privacy-policy-link" to="privacy-policy">
            Загальні положення
          </StyledNavLink>
        </ListItem>
      </List>
    </List>
  );
};
