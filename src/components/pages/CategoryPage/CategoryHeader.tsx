import React from 'react';
import { Typography, Stack } from '@mui/material';

import { StyledChip } from './style';
import { useParams } from 'react-router-dom';
import { categoryNames } from '../../../constants';
import { useSelector } from 'react-redux';
import { productsStateSelector } from 'redux/products/selector';
import { CategoryNameTypography } from './style';

const CategoryHeader: React.FC = () => {
  const { categoryName } = useParams();
  const { products } = useSelector(productsStateSelector);
  return (
    <Stack direction="row" alignItems="flex-end">
      <CategoryNameTypography variant="h4" gutterBottom>
        {categoryNames[`${categoryName}`]}
      </CategoryNameTypography>
      <StyledChip label={products.totalResult} size="small" />
    </Stack>
  );
};

export default CategoryHeader;
