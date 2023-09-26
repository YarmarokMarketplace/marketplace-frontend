import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import BasicBreadcrumbs from 'src/components/Breadcrumbs';
import SearchBar from 'src/components/SearchBar';
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
} from '../../../redux/products/reducer';
import { searchProductListFetch } from '../../../redux/products/thunk';
import SearchFilters from './SearchFilters';

const SearchPage = () => {
  const {
    search,
    searchProducts: { totalPages, page, limit, notices },
    filterBy,
    sort,
  } = useSelector(productsStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      searchProductListFetch({ keywords: search, sort, page, limit, filterBy })
    );
  }, [search, sort, page, limit, filterBy]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('location');
      localStorage.removeItem('price');
      localStorage.removeItem('search');
      dispatch(filterStateResetAction());
      dispatch(productSortAction('newest'));
    };
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentSearchPageSetAction(page));
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <SearchBar />
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
        <CategorySort />
      </Stack>
      <Stack
        sx={{ mt: 3, mb: 3 }}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
      >
        <SearchFilters />
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
