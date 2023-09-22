import React from 'react';
import { StyledContainer } from './style';
import { Content } from './Content';
import { Routes, Route, Outlet } from 'react-router-dom';
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
import { Typography } from '@mui/material';

const Articles = () => {
  return (
    <StyledContainer maxWidth="xl" disableGutters>
      <Routes>
        <Route path="general-requirements" element={<RulesOfUse />}></Route>
        <Route path="info-presentation" element={<InfoPresentation />}></Route>
        <Route path="info-content" element={<InfoContent />}></Route>
        <Route path="prohibited-goods" element={<ProhibitedGoods />}></Route>
        <Route
          path="prohibited-services"
          element={<ProhibitedServices />}
        ></Route>
        <Route
          path="how-to-buy"
          element={<Typography>how to buy</Typography>}
        ></Route>
        <Route
          path="how-to-sell"
          element={<Typography>how to sell</Typography>}
        ></Route>
        <Route path="activities" element={<Activities />}></Route>
        <Route path="security-rules" element={<SecurityRules />}></Route>
        <Route path="privacy-policy" element={<PrivacyPolicy />}></Route>
      </Routes>
      <Content />
    </StyledContainer>
  );
};

export default Articles;
