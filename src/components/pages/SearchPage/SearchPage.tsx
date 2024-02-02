import {
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BasicBreadcrumbs from 'src/components/Breadcrumbs';
import CategorySort from '../CategoryPage/CategorySort';
import { useDispatch, useSelector } from 'react-redux';
import { productsStateSelector } from '../../../redux/products/selector';
import CustomPagination from 'src/components/CustomPagination/CustomPagination';
import SearchProducts from './SearchProducts';

import { AppDispatch } from 'src/store';
import {
  currentSearchPageSetAction,
  filterStateResetAction,
  productSortAction,
  setSearchCategoryAction,
} from '../../../redux/products/reducer';
import { searchProductListFetch } from '../../../redux/products/thunk';
import SearchFilters from './SearchFilters';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const {
    search,
    searchProducts: { totalPages, page, limit, notices },
    filterBy,
    sort,
  } = useSelector(productsStateSelector);

  const dispatch: AppDispatch = useDispatch();
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(
      searchProductListFetch({ keywords: search, sort, page, limit, filterBy })
    );
  }, [search, sort, page, limit, filterBy]);

  console.log(page, filterBy);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    return () => {
      localStorage.removeItem('location');
      localStorage.removeItem('price');
      localStorage.removeItem('search');
      localStorage.removeItem('sort');
      dispatch(filterStateResetAction());
      dispatch(productSortAction('newest'));
      dispatch(setSearchCategoryAction(''));
    };
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentSearchPageSetAction(page));
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <BasicBreadcrumbs />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4">{`Результати пошуку за запитом ${
          search ? `"${search}"` : ''
        }`}</Typography>
        <CategorySort
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
      </Stack>
      <Stack
        sx={{ mt: 3, mb: 3 }}
        direction={isMdScreen ? 'column' : 'row'}
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
      >
        <SearchFilters
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
        <SearchProducts />
      </Stack>
      {notices.length > 0 && (
        <CustomPagination
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default SearchPage;
