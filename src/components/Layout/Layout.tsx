import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
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

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <MainContainer maxWidth={false} disableGutters>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <CustomDrawer />
        <CustomModal />
        <SnackbarSuccessMessage />
        <SnackbarErrorMessage />
        {isSmScreen && <ProfileMenuDrawer />}
      </MainContainer>
      <Footer />
    </>
  );
};

export default Layout;
