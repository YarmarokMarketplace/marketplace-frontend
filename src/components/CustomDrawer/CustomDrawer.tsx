import React from 'react';
import { IconButton, useTheme, useMediaQuery } from '@mui/material';
import { StyledCustomDrawer } from './style';

import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { drawerSelector } from './selector';
import { AppDispatch } from '../../store';
import { openDrawerAction } from './reducer';
import { DrawerContent } from '../../types';
import Register from '../DrawerContent';
import Login from '../DrawerContent/Login';
import ForgotPassword from '../DrawerContent/ForgotPassword';
import GoogleAuthMessage from '../DrawerContent/GoogleAuthMessage';
import ChangePassword from '../DrawerContent/ChangePassword';
import ChangeLogin from '../DrawerContent/ChangeLogin';
import SearchBar from '../SearchBar';

const CustomDrawer = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, content } = useSelector(drawerSelector);
  const dispatch: AppDispatch = useDispatch();
  const handleToggleDrawer = () => {
    dispatch(openDrawerAction(!open));
  };
  return (
    <>
      <StyledCustomDrawer
        variant='temporary'
        open={open}
        anchor='right'
        onClose={handleToggleDrawer}
      >
        {isSmScreen && <SearchBar />}
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              [theme.breakpoints.down('sm')]: {
                top: '8.8rem',
                right: '.8rem',
              },
            }}
            color='inherit'
            onClick={handleToggleDrawer}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
          {content == DrawerContent.login && <Login />}
          {/* {content == DrawerContent.chat && } */}
          {content == DrawerContent.register && <Register />}
          {content == DrawerContent.resetPassword && <ForgotPassword />}
          {content == DrawerContent.googleAuthMessage && <GoogleAuthMessage />}
          {content == DrawerContent.changePassword && <ChangePassword />}
          {content == DrawerContent.changeLogin && <ChangeLogin />}
        </>
      </StyledCustomDrawer>
    </>
  );
};

export default CustomDrawer;
