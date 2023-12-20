import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { getUserStateSelector } from 'redux/auth/selector';

import {
  openDrawerAction,
  setDrawerContentAction,
} from '../../../CustomDrawer/reducer';
import { DrawerContent } from 'src/types';

import { Stack, useTheme } from '@mui/material';
import {
  StyledFormLabel,
  InputWrapper,
  HeaderTypography,
  StyledButton,
  EmailTypography,
} from './style';

const Login_Password = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const { email } = useSelector(getUserStateSelector);
  const handleChangeEmail = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.changeLogin));
  };

  const handleChangePassword = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.changePassword));
  };

  return (
    <>
      <HeaderTypography mb='1.875rem'>Логін та пароль</HeaderTypography>

      <InputWrapper>
        <StyledFormLabel>Ваш поточний логін</StyledFormLabel>
        <EmailTypography variant='body2'>{email}</EmailTypography>
      </InputWrapper>
      <StyledButton
        sx={{ mt: '-3.5rem' }}
        onClick={handleChangeEmail}
        variant='text'
        size='small'
        color='primary'
        id='change-email'
        disableTouchRipple
      >
        Змінити email
      </StyledButton>
      <InputWrapper>
        <StyledFormLabel>Пароль</StyledFormLabel>
      </InputWrapper>
      <StyledButton
        sx={{ mt: '-3rem' }}
        onClick={handleChangePassword}
        variant='text'
        size='small'
        color='primary'
        id='change-email'
        disableTouchRipple
      >
        Змінити пароль
      </StyledButton>
      <Stack
        alignItems='flex-end'
        sx={{
          [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
          },
        }}
      >
        <StyledButton
          // sx={{ mt: "-3rem" }}
          // onClick={}
          variant='text'
          size='small'
          color='primary'
          id='change-email'
          disableTouchRipple
        >
          Допомога або скарга
        </StyledButton>
      </Stack>
    </>
  );
};

export default Login_Password;
