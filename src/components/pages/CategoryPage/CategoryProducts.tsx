import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Skeleton, Stack } from '@mui/material';
import { CategoryProductsWrapper } from './style';
import { useTheme } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import {
  productsStateSelector,
  productsResultStateSelector,
} from '../../../redux/products/selector';
import { productListFetch } from '../../../redux/products/thunk';

import ProductItem from './ProductItem';
import NoProductsMessage from './NoProductsMessage';

const CategoryProducts = () => {
  const { loading, error, sort, filterBy } = useSelector(productsStateSelector);
  const { result, limit, page } = useSelector(productsResultStateSelector);
  const dispatch: AppDispatch = useDispatch();
  let { categoryName } = useParams();
  const theme = useTheme();

  useEffect(() => {
    if (!categoryName || typeof categoryName !== 'string') return;
    dispatch(
      productListFetch({
        categoryName,
        sort,
        page,
        limit,
        filterBy,
      })
    );
  }, [dispatch, categoryName, sort, page, filterBy]);

  return (
    <>
      {!error && (
        <CategoryProductsWrapper gap={2}>
          {loading &&
            Array.from(Array(12).keys()).map((item, index) => {
              return (
                <Stack key={index} gap={1} p={2}>
                  <Skeleton
                    animation='wave'
                    variant='rounded'
                    sx={{
                      height: '12.5rem',
                      width: '100%rem',
                    }}
                  />
                  <Skeleton
                    animation='wave'
                    sx={{ height: '2.438rem', width: '90%' }}
                    variant='rounded'
                  />
                  <Skeleton
                    animation='wave'
                    sx={{ height: '0.875rem', width: '50%' }}
                    variant='rounded'
                  />
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Skeleton
                      animation='wave'
                      sx={{ height: '1.5em', width: '45%' }}
                      variant='rounded'
                    />
                    <Skeleton variant='circular' width={32} height={32} />
                  </Stack>
                </Stack>
              );
            })}

          {!loading &&
            result.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
        </CategoryProductsWrapper>
      )}

      {error && <NoProductsMessage />}
    </>
  );
};

export default CategoryProducts;
