import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Skeleton, Stack } from "@mui/material";
import { CategoryProductsWrapper } from "./style";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { productsResultStateSelector, productsStateSelector } from "./selector";
import { productListFetch } from "./thunk";

import ProductItem from "./ProductItem";

const CategoryProducts = () => {
  const { loading, error, sort } = useSelector(productsStateSelector);
  const { result, limit, page } = useSelector(productsResultStateSelector);
  const dispatch: AppDispatch = useDispatch();
  let { categoryName } = useParams();

  useEffect(() => {
    if (!categoryName || typeof categoryName !== "string") return;
    dispatch(productListFetch({ categoryName, sort, page, limit }));
  }, [dispatch, categoryName, sort, page]);

  return (
    <CategoryProductsWrapper gap={2}>
      {loading &&
        Array.from(Array(12).keys()).map((item, index) => {
          return (
            <Stack key={index} gap={1} p={2}>
              <Skeleton
                animation="wave"
                variant="rounded"
                sx={{ height: "12.5rem", width: "12.5rem" }}
              />
              <Skeleton
                animation="wave"
                sx={{ height: "2.438rem", width: "12rem" }}
                variant="rounded"
              />
              <Skeleton
                animation="wave"
                sx={{ height: "0.875rem", width: "6rem" }}
                variant="rounded"
              />
              <Stack direction="row" justifyContent="space-between">
                <Skeleton
                  animation="wave"
                  sx={{ height: "1.5em", width: "5.5rem" }}
                  variant="rounded"
                />
                <Skeleton variant="circular" width={32} height={32} />
              </Stack>
            </Stack>
          );
        })}
      {!loading &&
        !error &&
        result.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
    </CategoryProductsWrapper>
  );
};

export default CategoryProducts;
