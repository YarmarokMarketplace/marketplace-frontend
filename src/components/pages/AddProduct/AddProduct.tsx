import React, { useEffect } from 'react';

import { InfoBlock } from './InfoBlock';
import { StyledContainer } from './style';
import { ProductForm } from './ProductForm';
import { addAdvertStateSelector } from './selector';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { resetAddSavedDataAction } from './reducer';
import { userLoginStateSelector } from '../../../redux/auth/selector';
import { advertInitialData } from './utils';

const AddProduct = () => {
  const { loading, error, data } = useSelector(addAdvertStateSelector);
  const dispatch: AppDispatch = useDispatch();
  const { isLogin } = useSelector(userLoginStateSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('advertData', JSON.stringify(advertInitialData));
      dispatch(resetAddSavedDataAction());
    }
  }, [data]);

  return (
    <StyledContainer maxWidth="xl" disableGutters>
      {!loading && !error && data ? (
        <Stack spacing={3} paddingTop={3}>
          <Typography variant="h4">
            Вітаємо! Ваше оголошення успішно опубліковано
          </Typography>
          <Stack width="50%" direction="row" spacing={3}>
            <Button
              to={'/'}
              component={Link}
              sx={{ width: '10rem' }}
              variant="contained"
            >
              На головну
            </Button>
            <Button
              to={`/${data?.category}/${data?._id}`}
              component={Link}
              variant="outlined"
            >
              Переглянути оголошення
            </Button>
          </Stack>
        </Stack>
      ) : (
        <>
          <ProductForm />
          <InfoBlock />
        </>
      )}
    </StyledContainer>
  );
};

export default AddProduct;
