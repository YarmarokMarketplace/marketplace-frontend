import React from 'react';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction, setModalContentAction } from '../CustomModal/reducer';
import { deleteAccountFetch } from 'redux/auth/thunk';
import { getUserStateSelector } from 'redux/auth/selector';
import { useNavigate } from 'react-router';

import { Box, Typography, Stack, Button } from '@mui/material';

const DeleteAccountModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector(getUserStateSelector);

  const handleDelete = () => {
    dispatch(deleteAccountFetch(id));
    navigate('/', { replace: true });
    localStorage.removeItem('refreshToken');
    dispatch(openModalAction(false));
  };

  const handleCancel = () => {
    dispatch(openModalAction(false));
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      gap="1.5rem"
      textAlign="center"
    >
      <Typography variant="h4" width="29.5rem">
        Ви дійсно бажаєте видалити профіль, адже це призведе до видалення всіх
        ваших даних та оголошень?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={5}>
        <Button
          onClick={handleDelete}
          variant="outlined"
          color="error"
          sx={{ fontSize: '1.25rem', fontWeight: '500' }}
        >
          Так, видалити
        </Button>
        <Button
          onClick={handleCancel}
          variant="contained"
          sx={{ fontSize: '1.25rem', fontWeight: '500' }}
        >
          Скасувати
        </Button>
      </Stack>
    </Stack>
  );
};
export default DeleteAccountModal;
