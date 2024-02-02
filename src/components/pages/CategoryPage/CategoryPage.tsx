import React, { useEffect, useState } from 'react';

import { Typography, Stack, Link, useTheme } from '@mui/material';

import CategoryFilters from './CategoryFilters';

import { CategoryPageContainer } from './style';
import BasicBreadcrumbs from '../../Breadcrumbs';
import CategorySort from './CategorySort';
import CategoryHeader from './CategoryHeader';
import CategoryPagination from './CategoryPagination';
import CategoryProducts from './CategoryProducts';
import ChatButton from '../../ChatButton';
import { useDispatch, useSelector } from 'react-redux';
import { productsResultStateSelector } from '../../../redux/products/selector';
import { AppDispatch } from '../../../store';
import { productSortAction } from '../../../redux/products/reducer';

const CategoryPage = () => {
  const { result } = useSelector(productsResultStateSelector);
  const dispatch: AppDispatch = useDispatch();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    return () => {
      dispatch(productSortAction('newest'));
    };
  }, []);

  return (
    <CategoryPageContainer maxWidth="xl" disableGutters>
      <BasicBreadcrumbs>
        <Typography color="text.primary">Каталог</Typography>
      </BasicBreadcrumbs>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <CategoryHeader />
        <CategorySort
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
      </Stack>
      <Stack
        sx={{
          mt: 3,
          mb: 3,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={4}
      >
        <CategoryFilters
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        />
        <CategoryProducts />
      </Stack>
      {result?.length > 0 && <CategoryPagination />}
      <ChatButton />
    </CategoryPageContainer>
  );
};

export default CategoryPage;
