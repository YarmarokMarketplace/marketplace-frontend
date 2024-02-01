import React, { useEffect } from 'react';

import { InfoBlock } from './InfoBlock';
import { StyledContainer } from './style';
import { ProductForm } from './ProductForm';
import { addAdvertStateSelector } from './selector';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Typography,
  Button,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
  const theme: Theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Stack spacing={3} paddingTop={3} minHeight="80vh">
          <Typography variant="h4">
            Вітаємо! Ваше оголошення успішно опубліковано
          </Typography>
          <Stack width="100%" direction={{ sm: 'row' }} spacing={3} gap={2}>
            <Button
              to={'/'}
              component={Link}
              sx={{
                width: { sm: '10rem' },
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
              variant="contained"
            >
              На головну
            </Button>
            <Button
              to={`/${data?.category}/${data?._id}`}
              component={Link}
              variant="outlined"
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
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
