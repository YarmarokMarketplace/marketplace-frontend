import React, { Suspense, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from '../Header';
import Footer from '../Footer';
import { MainContainer } from './style';
import CustomDrawer from '../CustomDrawer';
import CustomModal from '../CustomModal';
import SnackbarSuccessMessage from '../SnackbarMessage/SnackbarSuccessMessage';
import SnackbarErrorMessage from '../SnackbarMessage/SnackbarErrorMessage';
import ProfileMenuDrawer from '../ProfileMenuDrawer';
import { CustomBottomNavigation } from '../BottomNavigation/CustomBottomNavigation';
import SearchBar from '../SearchBar';

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { pathname } = useLocation();

  return (
    <>
      <MainContainer maxWidth={false} disableGutters>
        <Header />
        {!pathname.startsWith('/profile') && <SearchBar />}
        {pathname.startsWith('/profile') && isSmScreen && <SearchBar />}

        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <CustomDrawer />
        <CustomModal />
        <SnackbarSuccessMessage />
        <SnackbarErrorMessage />
        {isSmScreen && <ProfileMenuDrawer />}
        {isSmScreen && <CustomBottomNavigation pathname={pathname} />}
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;
