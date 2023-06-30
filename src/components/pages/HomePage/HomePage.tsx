import React, { useEffect } from "react";

import { Skeleton, Stack, Typography } from "@mui/material";

import ChatButton from "../../ChatButton";
import CategoryItem from "./CategoryItem";
import SearchBar from "../../SearchBar";

import {
  CategoriesWrapper,
  StyledBox,
  StyledContainer,
  StyledImage,
  StyledLink,
  StyledMoreIcon,
  StyledSkeleton,
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
    <StyledContainer maxWidth="xl">
      <SearchBar />
      <CategoriesWrapper>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Головні рубрики</Typography>
          <StyledLink to="/categories">Всі</StyledLink>
        </Stack>
        <StyledBox>
          {loading &&
            Array.from(Array(12).keys()).map((item, index) => {
              return (
                <Stack key={index} spacing={2}>
                  <StyledSkeleton animation="wave" variant="rectangular" />
                  <Skeleton
                    animation="wave"
                    sx={{ height: 60, width: 165 }}
                    variant="rounded"
                  />
                </Stack>
              );
            })}
          {!loading &&
            !error &&
            categories.slice(0, 11).map((category) => {
              return (
                <CategoryItem key={category._id} category={category.name}>
                  <StyledImage
                    id={`category-${category._id.slice(20)}`}
                    src="https://freepngimg.com/thumb/toy/33903-2-plush-toy-transparent-image.png"
                    alt={`${category.name} image`}
                  />
                </CategoryItem>
              );
            })}
          {!loading && (
            <CategoryItem category="Переглянути всі">
              <StyledMoreIcon color="primary" />
            </CategoryItem>
          )}
        </StyledBox>
      </CategoriesWrapper>
      <ChatButton />
    </StyledContainer>
  );
};

export default HomePage;
