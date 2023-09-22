import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import {
  StyledContainer,
  StyledCrumpsLink,
  StyledProductWrapper,
} from './style';
import { CarouselImage } from './Carousel';
import { ProductInfo } from './ProductInfo';
import { ProductDescription } from './ProductDescription';
import SearchBar from '../../SearchBar';
import { ProductFeedback } from './ProductFeedback';
import { useDispatch, useSelector } from 'react-redux';
import { productStateSelector } from './selectors';
import { AppDispatch } from '../../../store';
import { useParams } from 'react-router-dom';
import { productFetch } from './thunk';
import BasicBreadcrumbs from '../../Breadcrumbs';
import { categoryNames } from '../../../constants';
import { ProductItem } from 'src/types';

const SingleProductPage = () => {
  const { loading, error, product } = useSelector(productStateSelector);
  const dispatch: AppDispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(productFetch(id));
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      const items: ProductItem[] =
        JSON.parse(localStorage.getItem('viewedProducts')!) || [];
      const viewedProducts = items.filter((item) => item._id !== product._id);
      if (viewedProducts.length < 20) {
        viewedProducts.unshift(product);
      } else {
        viewedProducts.pop();
        viewedProducts.unshift(product);
      }
      localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
    }
  }, [product]);

  return (
    <StyledContainer maxWidth={false} disableGutters>
      <SearchBar />
      {!loading && !error && product && (
        <>
          <BasicBreadcrumbs>
            <StyledCrumpsLink
              id={`${product.category}-link`}
              to={`/${product.category}`}
            >
              {categoryNames[product.category]}
            </StyledCrumpsLink>
            <Typography color="text.primary">{product.title}</Typography>
          </BasicBreadcrumbs>
          <Stack spacing={4}>
            <StyledProductWrapper maxWidth={false} disableGutters>
              <CarouselImage photos={product.photos} />
              <ProductInfo product={product} />
              <Stack spacing={4}>
                <ProductDescription description={product.description} />
                <ProductFeedback seller={product.contactName} />
              </Stack>
            </StyledProductWrapper>

            {/* <Typography variant="h4">Інші товари продавця</Typography> */}
          </Stack>
        </>
      )}
    </StyledContainer>
  );
};

export default SingleProductPage;
