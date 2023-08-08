import React, { useEffect } from "react";

import { Typography, Stack, Link } from "@mui/material";

import SearchBar from "../../SearchBar";
import CategoryFilters from "./CategoryFilters";

import { CategoryPageContainer } from "./style";
import BasicBreadcrumbs from "../../Breadcrumbs";
import CategorySort from "./CategorySort";
import CategoryHeader from "./CategoryHeader";
import CategoryPagination from "./CategoryPagination";
import CategoryProducts from "./CategoryProducts";
import ChatButton from "../../ChatButton";
import { useDispatch, useSelector } from "react-redux";
import { productsResultStateSelector } from "./selector";
import { AppDispatch } from "../../../store";
import { productSortAction } from "./reducer";

const CategoryPage = () => {
  const { result } = useSelector(productsResultStateSelector);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(productSortAction("newest"));
    };
  }, []);
  return (
    <CategoryPageContainer maxWidth="xl" disableGutters>
      <SearchBar />
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
        <CategorySort />
      </Stack>
      <Stack
        sx={{ mt: 3 }}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={4}
      >
        <CategoryFilters />
        <CategoryProducts />
      </Stack>
      {result.length > 0 && <CategoryPagination />}
      <ChatButton />
    </CategoryPageContainer>
  );
};

export default CategoryPage;
