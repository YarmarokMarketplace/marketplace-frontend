import {
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import CategoryItem from './CategoryItem';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { categoryListColors } from 'src/constants';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesStateSelector } from './selector';
import { Link } from 'react-router-dom';
import { AppDispatch } from 'src/store';
import { categoryListFetch } from './thunk';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';
import SearchBar from 'src/components/SearchBar';

export const CategoryListPage = () => {
  const { categories } = useSelector(categoriesStateSelector);

  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(categoryListFetch());
  }, [dispatch]);

  return (
    <Stack gap={1} mb={1}>
      <SearchBar />
      <Stack direction="row" alignItems="center" mb={2}>
        <IconButton
          disableFocusRipple
          disableRipple
          sx={{ width: '4rem' }}
          component={Link}
          to="/"
        >
          <ArrowBackIosNewRoundedIcon
            sx={{ color: 'text.disabled' }}
            fontSize="small"
          />
        </IconButton>
        <Typography variant="h4">Категорія</Typography>
      </Stack>
      <Stack gap={1}>
        {categories.map((category, index) => {
          return (
            <CategoryItem
              key={category._id}
              list
              category={category}
              color={categoryListColors[index]}
            />
          );
        })}
      </Stack>
      {isSmScreen && <CustomBottomNavigation pathname="all-categories" />}
    </Stack>
  );
};
