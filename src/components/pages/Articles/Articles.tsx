import React from 'react';
import { StyledContainer } from './style';
import { Content } from './Content';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import HowToBuy from './HowToBuy';
import HowToSell from './HowToSell';
import NotFoundPage from 'src/components/NotFoundPage';
import { useTheme, useMediaQuery } from '@mui/material';
import { TabletContent } from './TabletContent';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';

const Articles = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const { pathname } = useLocation();
  return (
    <StyledContainer maxWidth="xl" disableGutters>
      {isLgScreen ? (
        <>
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
            <Route path="how-to-buy" element={<HowToBuy />}></Route>
            <Route path="how-to-sell" element={<HowToSell />}></Route>
            <Route path="activities" element={<Activities />}></Route>
            <Route path="security-rules" element={<SecurityRules />}></Route>
            <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
          <Content />
        </>
      ) : (
        <>
          <TabletContent />
          <CustomBottomNavigation pathname={pathname} />
        </>
      )}
    </StyledContainer>
  );
};

export default Articles;
