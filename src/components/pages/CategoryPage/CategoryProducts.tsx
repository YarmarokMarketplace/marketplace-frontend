import React, { useEffect } from 'react';

import { Skeleton, Stack, Box, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { productsStateSelector } from "./selector";
import { productListFetch } from "./thunk";
import { AppDispatch } from "../../../store";

import ProductItem from './ProductItem';

const CategoryProducts = () => {
    const { products, loading, error } = useSelector(productsStateSelector);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(productListFetch());
    }, [dispatch]);

    return (
        <Box
            gap={2}
            sx={{
                display: 'grid',
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                width: '61.5rem'
            }}>
            {loading &&
                Array.from(Array(12).keys()).map((item, index) => {
                    return (
                        <Stack key={index} gap={2} p={2}>
                            <Skeleton animation="wave" variant="rounded" sx={{ height: "12.5rem", width: "12.5rem" }} />
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
                products.slice(0, 11).map((product) => {
                    return (
                        <ProductItem key={product._id} product={product} />
                    );
                })
            }
        </Box>

    )
};

export default CategoryProducts;