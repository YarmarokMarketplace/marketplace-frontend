import React from 'react';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../CustomModal/reducer';
import { changeOrderStatusFetch } from 'redux/orders/thunk';
import { ordersStateSelector } from 'redux/orders/selector';

import { Typography, Stack, Button } from '@mui/material';

const ConfirmReceivedModal = () => {
  const dispatch: AppDispatch = useDispatch();

  const { orderId: _id } = useSelector(ordersStateSelector);

  const handleConfirm = async (e: React.SyntheticEvent) => {
    const status = 'received';
    if (_id) {
      await dispatch(changeOrderStatusFetch({ status, _id }));
    }
    dispatch(openModalAction(false));
  };

  const handleCancel = () => {
    dispatch(openModalAction(false));
  };

  return (
    <Stack direction="column" alignItems="center" gap="1.5rem" width="36.75rem">
      <Typography variant="h4" textAlign="center" width="70%">
        Ви дійсно хочете підтвердити отримання? Після підтвердження Ви вже не
        зможете змінити статус покупки.
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={5}>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{
            fontSize: { xs: '0.875rem', md: '1.25rem' },
            fontWeight: '500',
          }}
        >
          Так, я отримав
        </Button>
        <Button
          onClick={handleCancel}
          variant="outlined"
          sx={{
            fontSize: { xs: '0.875rem', md: '1.25rem' },
            fontWeight: '500',
          }}
        >
          Скасувати
        </Button>
      </Stack>
    </Stack>
  );
};
export default ConfirmReceivedModal;
