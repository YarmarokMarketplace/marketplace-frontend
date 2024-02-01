import React, { useEffect } from 'react';

import { InfoBlock } from './InfoBlock';
import { StyledContainer } from './style';
import { addAdvertStateSelector } from './selector';
import { useDispatch, useSelector } from 'react-redux';
import {
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Theme,
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { resetAddAdvertStateAction, resetAddSavedDataAction } from './reducer/';
import { userLoginStateSelector } from '../../../redux/auth/selector';
import { advertInitialData } from './utils';
import { productFetch } from '../SingleProductPage/thunk';
import { productStateSelector } from '../SingleProductPage/selectors';
import { ProductForm } from './ProductForm';
import { resetAddAdvertState } from './actions';

const EditProduct = () => {
  const { loading, error, data } = useSelector(addAdvertStateSelector);
  const dispatch: AppDispatch = useDispatch();
  const { isLogin } = useSelector(userLoginStateSelector);
  const { product } = useSelector(productStateSelector);
  const productLoading = useSelector(productStateSelector).loading;

  const theme: Theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
    dispatch(resetAddAdvertStateAction());
    return () => {
      dispatch(resetAddAdvertStateAction());
    };
  }, [isLogin]);

  useEffect(() => {
    if (id) {
      dispatch(productFetch(id));
    }
  }, [id]);

  return (
    <StyledContainer maxWidth="xl" disableGutters>
      {!loading && !error && data ? (
        <Stack spacing={3} paddingTop={3}>
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
          {!productLoading && product && (
            <>
              <ProductForm edit product={product.notice} />
              <InfoBlock />
            </>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default EditProduct;
