import React from 'react';
import { AppDispatch } from '../../store';
import { useDispatch } from 'react-redux';
import { openModalAction, setModalContentAction } from '../CustomModal/reducer';
import { logoutFetch } from 'redux/auth/thunk';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Box, Typography, Stack, Button } from '@mui/material';

const LogoutModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    dispatch(logoutFetch());
    navigate('/', { replace: true });
    localStorage.removeItem('refreshToken');
    dispatch(openModalAction(false));
  };

  const handleCancel = () => {
    dispatch(openModalAction(false));
  };

  return (
    <Stack direction='column' alignItems='center' gap='1.5rem'>
      <Typography variant='h4'>Ви дійсно бажаєте вийти з профілю?</Typography>
      {!isSmScreen ? (
        <Stack direction='row' justifyContent='center' spacing={5}>
          <Button
            onClick={handleLogout}
            variant='outlined'
            sx={{ fontSize: '1.25rem', fontWeight: '500' }}
          >
            Так, вийти
          </Button>
          <Button
            onClick={handleCancel}
            variant='contained'
            sx={{ fontSize: '1.25rem', fontWeight: '500' }}
          >
            Скасувати
          </Button>
        </Stack>
      ) : (
        <Stack direction='row' justifyContent='center' spacing={2}>
          <Button
            onClick={handleLogout}
            variant='outlined'
            size='small'
            sx={{
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.3rem 2rem',
            }}
          >
            Так, вийти
          </Button>
          <Button
            onClick={handleCancel}
            variant='contained'
            size='small'
            sx={{
              fontSize: '1rem',
              fontWeight: '500',
              padding: '0.3rem 2rem',
            }}
          >
            Скасувати
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
export default LogoutModal;
