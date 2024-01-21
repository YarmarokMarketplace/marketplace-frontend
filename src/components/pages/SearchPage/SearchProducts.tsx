import React, { useEffect } from 'react';

import { Skeleton, Stack } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';

import ProductItem from '../CategoryPage/ProductItem';
import {
  productsStateSelector,
  searchResultStateSelector,
} from '../../../redux/products/selector';
import { currentSearchPageSetAction } from '../../../redux/products/reducer';
import { SearchProductsWrapper } from './style';
import NoProductsMessage from '../CategoryPage/NoProductsMessage';

const SearchProducts = () => {
  const { loading, error, sort, filterBy } = useSelector(productsStateSelector);
  const { notices, page } = useSelector(searchResultStateSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {}, [dispatch, sort, page, filterBy]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentSearchPageSetAction(page));
  };

  return (
    <>
      {!error && (
        <SearchProductsWrapper>
          {loading &&
            Array.from(Array(12).keys()).map((item, index) => {
              return (
                <Stack key={index} gap={1} p={2}>
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ height: '12.5rem', width: '12.5rem' }}
                  />
                  <Skeleton
                    animation="wave"
                    sx={{ height: '2.438rem', width: '12rem' }}
                    variant="rounded"
                  />
                  <Skeleton
                    animation="wave"
                    sx={{ height: '0.875rem', width: '6rem' }}
                    variant="rounded"
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Skeleton
                      animation="wave"
                      sx={{ height: '1.5em', width: '5.5rem' }}
                      variant="rounded"
                    />
                    <Skeleton variant="circular" width={32} height={32} />
                  </Stack>
                </Stack>
              );
            })}
          {!loading &&
            notices.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
        </SearchProductsWrapper>
      )}
      {!loading && (error || !notices.length) && <NoProductsMessage />}
    </>
  );
};

export default SearchProducts;
