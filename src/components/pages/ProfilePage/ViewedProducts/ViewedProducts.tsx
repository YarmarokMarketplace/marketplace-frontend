import React, { useEffect, useState } from 'react';
import {
  BoxShadowContainer,
  GridProductsWrapper,
  StyledAdsContainer,
  StyledTitleContainer,
} from '../style';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { ProductItem as ProductItemType } from 'src/types';
import ProductItem from '../../CategoryPage/ProductItem';
import ProfilePagination from '../ProfilePagination';
import NoProductMessage from '../NoProductMessage';

import placeholderImage from '../../../../img/no-fav-product.png';
import SearchBar from 'src/components/SearchBar';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';
import { useLocation } from 'react-router-dom';

const ViewedProducts = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [offset, setOffset] = useState<number>(0);
  const [endOffset, setEndOffset] = useState<number>(0);
  const [products, setProducts] = useState<ProductItemType[] | []>([]);
  const [productList, setProductList] = useState<ProductItemType[] | []>([]);
  const { pathname } = useLocation();

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const viewed: ProductItemType[] = JSON.parse(
      localStorage.getItem('viewedProducts')!
    );
    if (viewed) {
      setEndOffset(offset + itemsPerPage);
      setTotalPages(Math.ceil(viewed.length / itemsPerPage));
      setProducts(viewed);
    }
  }, [page, offset, itemsPerPage]);

  useEffect(() => {
    setProductList(products.slice(offset, endOffset));
  }, [offset, endOffset]);

  const handlePageChange = (
    e: React.ChangeEvent<unknown>,
    currentPage: number
  ) => {
    const newOffset = ((currentPage - 1) * itemsPerPage) % products.length;
    setPage(currentPage);
    setOffset(newOffset);
  };

  return (
    <StyledAdsContainer>
      {isSmScreen && <SearchBar />}
      <StyledTitleContainer>
        <Typography variant="h4">Переглянуті товари</Typography>
      </StyledTitleContainer>
      <GridProductsWrapper>
        {productList.length > 0 &&
          productList.length < itemsPerPage + 1 &&
          productList.map((product) => {
            return <ProductItem key={product._id} product={product} />;
          })}
      </GridProductsWrapper>
      {productList.length > 0 && (
        <ProfilePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      {productList.length === 0 && (
        <NoProductMessage src={placeholderImage}>
          <Typography variant="h4" fontWeight={700} mt={3}>
            Ваш вибір: найкращі з переглянутих товарів
          </Typography>
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.secondary"
            mt={1}
          >
            Тут з’являтимуться оголошення, які ви недавно переглянули.
          </Typography>
        </NoProductMessage>
      )}
      {isSmScreen && <CustomBottomNavigation pathname={pathname} />}
    </StyledAdsContainer>
  );
};

export default ViewedProducts;
