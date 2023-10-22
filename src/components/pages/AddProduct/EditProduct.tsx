import React, { useEffect } from 'react';

import { InfoBlock } from './InfoBlock';
import { StyledContainer } from './style';
import { addAdvertStateSelector } from './selector';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../../store';
import { resetAddAdvertStateAction, resetAddSavedDataAction } from './reducer';
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
            Вітаємо! Ваше оголошення успішно збережено
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
          {!productLoading && product && (
            <>
              <ProductForm edit product={product} />
              <InfoBlock />
            </>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default EditProduct;
