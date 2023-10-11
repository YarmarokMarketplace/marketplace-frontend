import React, { useEffect, useState } from 'react';
import {
  GridProductsWrapper,
  StyledAdsContainer,
  StyledTitleContainer,
} from '../style';
import { Skeleton, Stack, Typography } from '@mui/material';
import ProductItem from '../../CategoryPage/ProductItem';
import ProfilePagination from '../ProfilePagination';
import NoProductMessage from '../NoProductMessage';

import placeholderImage from '../../../../img/no-fav-product.png';
import { favAdsStateSelector, profileStateSelector } from '../selector';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { userFavoritesProductsListFetch } from '../thunk';
import { currentFavPageSetAction, offsetFavSetAction } from '../reducer';

const FavProducts = () => {
  const { loading, error, data, page, offset, itemsPerPage } =
    useSelector(favAdsStateSelector);

  const [totalPages, setTotalPages] = useState<number>(1);
  const [endOffset, setEndOffset] = useState<number>(0);
  const [products, setProducts] = useState<ProductItem[] | []>([]);
  const [productList, setProductList] = useState<ProductItem[] | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const favoriteList = useSelector(profileStateSelector).favorites;

  useEffect(() => {
    dispatch(userFavoritesProductsListFetch());
  }, [favoriteList]);

  useEffect(() => {
    if (data.length > 0) {
      setEndOffset(offset + itemsPerPage);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setProducts(data);
    }
  }, [offset, itemsPerPage, data]);

  useEffect(() => {
    setProductList(products.slice(offset, endOffset));
  }, [offset, endOffset, products]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    currentPage: number
  ) => {
    const newOffset = ((currentPage - 1) * itemsPerPage) % products.length;
    dispatch(offsetFavSetAction(newOffset));
    dispatch(currentFavPageSetAction(currentPage));
  };

  return (
    <StyledAdsContainer>
      <StyledTitleContainer>
        <Typography variant="h4">Обране</Typography>
      </StyledTitleContainer>
      <GridProductsWrapper>
        {!loading &&
          !error &&
          productList &&
          productList.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                productList={productList}
              />
            );
          })}
        {loading &&
          Array.from(Array(8).keys()).map((item, index) => {
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
      </GridProductsWrapper>
      {productList && productList.length > 0 && !loading && (
        <ProfilePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      {productList && productList.length === 0 && !loading && (
        <NoProductMessage src={placeholderImage}>
          <Typography variant="h4" fontWeight={700} mt={3}>
            Збережіть цікаві оголошення
          </Typography>
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.secondary"
            mt={1}
          >
            Натисніть ♡ на оголошенні, яке вас зацікавило, і ми збережемо його
            тут.
          </Typography>
        </NoProductMessage>
      )}
    </StyledAdsContainer>
  );
};

export default FavProducts;
