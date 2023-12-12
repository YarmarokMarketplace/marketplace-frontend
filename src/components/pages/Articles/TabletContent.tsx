import {
  ListItem,
  List,
  Typography,
  Collapse,
  Paper,
  Stack,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import React, { useState } from 'react';
import {
  StyledListContentItem,
  StyledListTabletContentItem,
  StyledNavLink,
} from './style';
import { useLocation, Routes, Route } from 'react-router-dom';
import {
  RulesOfUse,
  InfoPresentation,
  InfoContent,
  ProhibitedGoods,
  PrivacyPolicy,
  SecurityRules,
  ProhibitedServices,
  Activities,
} from './';
import NotFoundPage from 'src/components/NotFoundPage';
import HowToBuy from './HowToBuy';
import HowToSell from './HowToSell';

const pathNames = ['general', 'info', 'prohibited', 'activities'];

export const TabletContent = () => {
  const { pathname } = useLocation();
  const [termsExpanded, setTermsExpanded] = useState(
    pathNames.some((path) => pathname.includes(path))
  );
  const [howToExpanded, setHowToExpanded] = useState(
    pathname.includes('how-to')
  );
  const [rulesExpanded, setRulesExpanded] = useState(
    pathname.includes('security-rules')
  );
  const [privacyExpanded, setPrivacyExpanded] = useState(
    pathname.includes('privacy-policy')
  );
  return (
    <List>
      <Typography fontWeight={700} variant="h6">
        Зміст
      </Typography>

      <List>
        <StyledListTabletContentItem
          onClick={() => setTermsExpanded(!termsExpanded)}
          hidden={termsExpanded}
        >
          <Typography variant="body1">Умови використання</Typography>
          <IconButton>
            {termsExpanded ? (
              <ExpandLess sx={{ color: 'text.primary' }} fontSize="small" />
            ) : (
              <ExpandMore sx={{ color: 'text.primary' }} fontSize="small" />
            )}
          </IconButton>
        </StyledListTabletContentItem>
        <Collapse in={termsExpanded} timeout={'auto'}>
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
            <StyledNavLink
              id="prohibited-services-link"
              to="prohibited-services"
            >
              Заборонені послуги
            </StyledNavLink>
          </ListItem>
          <ListItem>
            <StyledNavLink id="activities-link" to="activities">
              Види діяльності
            </StyledNavLink>
          </ListItem>
          <Routes>
            <Route path="general-requirements" element={<RulesOfUse />}></Route>
            <Route
              path="info-presentation"
              element={<InfoPresentation />}
            ></Route>
            <Route path="info-content" element={<InfoContent />}></Route>
            <Route
              path="prohibited-goods"
              element={<ProhibitedGoods />}
            ></Route>
            <Route
              path="prohibited-services"
              element={<ProhibitedServices />}
            ></Route>
            <Route path="activities" element={<Activities />}></Route>
          </Routes>
        </Collapse>
      </List>
      <List>
        <StyledListTabletContentItem
          onClick={() => setHowToExpanded(!howToExpanded)}
          hidden={howToExpanded}
        >
          <Typography variant="body1">
            Посібник з покупок на Yarmarok
          </Typography>
          <IconButton>
            {howToExpanded ? (
              <ExpandLess sx={{ color: 'text.primary' }} fontSize="small" />
            ) : (
              <ExpandMore sx={{ color: 'text.primary' }} fontSize="small" />
            )}
          </IconButton>
        </StyledListTabletContentItem>
        <Collapse in={howToExpanded} timeout="auto">
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
          <Routes>
            <Route path="how-to-buy" element={<HowToBuy />}></Route>
            <Route path="how-to-sell" element={<HowToSell />}></Route>
          </Routes>
        </Collapse>
      </List>
      <List>
        <StyledListTabletContentItem
          onClick={() => setRulesExpanded(!rulesExpanded)}
          hidden={rulesExpanded}
        >
          <Typography variant="body1">Правила безпеки</Typography>
          <IconButton>
            {rulesExpanded ? (
              <ExpandLess sx={{ color: 'text.primary' }} fontSize="small" />
            ) : (
              <ExpandMore sx={{ color: 'text.primary' }} fontSize="small" />
            )}
          </IconButton>
        </StyledListTabletContentItem>
        <Collapse in={rulesExpanded} timeout="auto">
          <ListItem>
            <StyledNavLink id="security-rules-link" to="security-rules">
              Як захистити себе при купівлі товарів через Інтернет
            </StyledNavLink>
          </ListItem>
          <Routes>
            <Route path="security-rules" element={<SecurityRules />}></Route>
          </Routes>
        </Collapse>
      </List>
      <List>
        <StyledListTabletContentItem
          onClick={() => setPrivacyExpanded(!privacyExpanded)}
          sx={{ padding: '16px 16px 16px 8px' }}
          hidden={privacyExpanded}
        >
          <Typography variant="body1">Політика конфіденційності</Typography>
          {privacyExpanded ? (
            <ExpandLess sx={{ color: 'text.primary' }} fontSize="small" />
          ) : (
            <ExpandMore sx={{ color: 'text.primary' }} fontSize="small" />
          )}
        </StyledListTabletContentItem>
        <Collapse in={privacyExpanded} timeout="auto">
          <ListItem>
            <StyledNavLink id="privacy-policy-link" to="privacy-policy">
              Загальні положення
            </StyledNavLink>
          </ListItem>
          <Routes>
            <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
          </Routes>
        </Collapse>
      </List>
    </List>
  );
};
