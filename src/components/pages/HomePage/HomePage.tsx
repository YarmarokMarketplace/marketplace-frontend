import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import ChatButton from '../../ChatButton';
import CategoryItem from './CategoryItem';
import SearchBar from '../../SearchBar';
import {
  StyledCategoryContainer,
  StyledContainer,
  StyledLink,
  StyledSkeleton,
  StyledTextSkeleton,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesStateSelector } from './selector';
import { categoryListFetch } from './thunk';
import { AppDispatch } from '../../../store';
import { setToken } from '../../../api/client';
import {
  isSocialLoginSetAction,
  socialLoginUserSetAction,
} from '../../DrawerContent/reducer';

const HomePage = () => {
  const { categories, loading, error } = useSelector(categoriesStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryListFetch());
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.size > 0) {
      const name = queryParams.get('name');
      const email = queryParams.get('email');
      const accessToken = queryParams.get('accessToken');
      const refreshToken = queryParams.get('refreshToken');
      if (name && email && refreshToken && accessToken) {
        setToken(accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(isSocialLoginSetAction(true));
        dispatch(socialLoginUserSetAction({ name, email }));
      }
      const newURL = `${window.location.origin}${window.location.pathname}`;
      window.history.replaceState({}, document.title, newURL);
    }
  }, []);

  return (
    <StyledContainer maxWidth="xl" disableGutters>
      <SearchBar />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Головні рубрики</Typography>
        <StyledLink to="/categories">Всі</StyledLink>
      </Stack>
      <StyledCategoryContainer>
        {loading &&
          Array.from(Array(16).keys()).map((item, index) => {
            return (
              <Stack key={index} spacing={2}>
                <StyledSkeleton animation="wave" variant="rounded" />
                <StyledTextSkeleton animation="wave" variant="rounded" />
              </Stack>
            );
          })}
        {!loading &&
          !error &&
          categories.map((category) => {
            return <CategoryItem key={category._id} category={category} />;
          })}
      </StyledCategoryContainer>
      <ChatButton />
    </StyledContainer>
  );
};

export default HomePage;
