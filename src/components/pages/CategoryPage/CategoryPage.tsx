import React from 'react';

import { Typography, Stack } from "@mui/material";

import SearchBar from '../../SearchBar';
import CategoryFilters from './CategoryFilters';

import { CategoryPageContainer } from './style';
import BasicBreadcrumbs from '../../Breadcrumbs';
import CategorySort from './CategorySort';
import CategoryHeader from './CategoryHeader';
import CategoryPagination from './CategoryPagination';
import CategoryProducts from './CategoryProducts';
import ChatButton from '../../ChatButton';

const CategoryPage = () => {
    return (
        <CategoryPageContainer maxWidth="xl" disableGutters>
            <SearchBar />
            <BasicBreadcrumbs />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <CategoryHeader />
                <CategorySort />
            </Stack>
            <Stack sx={{ mt: 3 }}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={4}
            >
                <CategoryFilters />
                <CategoryProducts />
            </Stack>
            <CategoryPagination />
            <ChatButton />
        </CategoryPageContainer>
    )
};

export default CategoryPage;
