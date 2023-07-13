import React, { useEffect } from "react";

import { Stack, Typography } from "@mui/material";

import ChatButton from "../../ChatButton";
import CategoryItem from "./CategoryItem";
import SearchBar from "../../SearchBar";

import {
  StyledCategoryContainer,
  StyledContainer,
  StyledLink,
  StyledSkeleton,
  StyledTextSkeleton,
} from "./style";

import { useDispatch, useSelector } from "react-redux";
import { categoriesStateSelector } from "./selector";
import { categoryListFetch } from "./thunk";
import { AppDispatch } from "../../../store";

const HomePage = () => {
  const { categories, loading, error } = useSelector(categoriesStateSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryListFetch());
  }, [dispatch]);

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
