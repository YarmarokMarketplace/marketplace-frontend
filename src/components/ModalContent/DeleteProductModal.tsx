import React from 'react';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../CustomModal/reducer';
import {
  deleteProductFetch,
  userProductsListFetch,
} from '../../redux/profile/thunk';
import {
  ownAdsStateSelector,
  profileStateSelector,
} from '../../redux/profile/selector';
import { currentPageSetAction } from '../../redux/profile/reducer';

import { Typography, Stack, Button } from '@mui/material';

const DeleteProductModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    data: { page, limit, inactiveNotices },
  } = useSelector(ownAdsStateSelector);
  const { productId } = useSelector(profileStateSelector);

  const handleProductDelete = async (e: React.SyntheticEvent) => {
    if (productId) {
      await dispatch(deleteProductFetch(productId));
      if (inactiveNotices.length % limit === 1) {
        dispatch(currentPageSetAction(page - 1));
      } else {
        dispatch(userProductsListFetch({ page, limit }));
      }
    }
    dispatch(openModalAction(false));
  };

  const handleCancel = () => {
    dispatch(openModalAction(false));
  };

  return (
    <Stack direction="column" alignItems="center" gap="1.5rem">
      <Typography variant="h4">
        Ви дійсно бажаєте видалити оголошення?
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={5}>
        <Button
          onClick={handleProductDelete}
          variant="contained"
          sx={{
            fontSize: { xs: '0.875rem', md: '1.25rem' },
            fontWeight: '500',
          }}
        >
          Так, видалити
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
export default DeleteProductModal;
