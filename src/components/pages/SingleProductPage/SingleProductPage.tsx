import React, { useEffect } from 'react';
import {
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  StyledContainer,
  StyledCrumpsLink,
  StyledProductWrapper,
  StyledInfoProductWrapper,
} from './style';
import { CarouselImage } from './Carousel';
import { ProductInfo } from './ProductInfo';
import { ProductDescription } from './ProductDescription';
import SearchBar from '../../SearchBar';
import { ProductFeedback } from './ProductFeedback';
import { useDispatch, useSelector } from 'react-redux';
import { productStateSelector } from './selectors';
import { AppDispatch } from '../../../store';
import { useLocation, useParams } from 'react-router-dom';
import { productFetch } from './thunk';
import BasicBreadcrumbs from '../../Breadcrumbs';
import { categoryNames } from '../../../constants';
import { ProductItem } from 'src/types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';

const SingleProductPage = () => {
  const { loading, error, product } = useSelector(productStateSelector);
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();

  const theme: Theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { pathname } = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(productFetch(id));
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      const items: ProductItem[] =
        JSON.parse(localStorage.getItem('viewedProducts')!) || [];
      const viewedProducts = items.filter(
        (item) => item._id !== product.notice._id
      );
      if (viewedProducts.length < 20) {
        viewedProducts.unshift(product.notice);
      } else {
        viewedProducts.pop();
        viewedProducts.unshift(product.notice);
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
              id={`${product.notice.category}-link`}
              to={`/${product.notice.category}`}
            >
              {categoryNames[product.notice.category]}
            </StyledCrumpsLink>
            <Typography color="text.primary">{product.notice.title}</Typography>
          </BasicBreadcrumbs>
          {!product.notice.active && (
            <StyledInfoProductWrapper
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <InfoOutlinedIcon />
              <Typography variant="h4">Оголошення не активне</Typography>
            </StyledInfoProductWrapper>
          )}
          <Stack
            spacing={4}
            sx={{ opacity: !product.notice.active ? '0.3' : '1' }}
          >
            <StyledProductWrapper maxWidth={false} disableGutters>
              {product.notice.active && (
                <CarouselImage photos={product.notice.photos} />
              )}
              <ProductInfo
                product={product.notice}
                sellerRating={product.sellerRating}
              />
              <Stack spacing={4}>
                <ProductDescription description={product.notice.description} />
                <ProductFeedback seller={product.notice.contactName} />
              </Stack>
            </StyledProductWrapper>

            {/* <Typography variant="h4">Інші товари продавця</Typography> */}
          </Stack>
        </>
      )}
      {isSmScreen && <CustomBottomNavigation pathname={pathname} />}
    </StyledContainer>
  );
};

export default SingleProductPage;
