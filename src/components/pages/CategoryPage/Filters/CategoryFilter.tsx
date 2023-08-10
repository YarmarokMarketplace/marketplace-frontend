import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import {
    productFilterGoodtypeAction,
    productFilterPriceAction,
    productFilterLocationAction
} from "../reducer";
import { categoriesStateSelector } from "../../HomePage/selector";
import { categoryListFetch } from "../../HomePage/thunk";

import {
    FormLabel, ListItemButton, FormControl, List,
    ListItem, Collapse
} from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';

import { categoryNames } from '../../../../constants';
import {
    FilterText, CategoryCollapse, CategoryList, CurrentCategoryListItemText, CategoryListItemText
} from "../style";

interface CategoryFilterProps {
    setIsCheckedNew: (value: boolean) => void;
    setIsCheckedUsed: (value: boolean) => void;
    setMinPriceValue: (value: string) => void;
    setMaxPriceValue: (value: string) => void;
    setValue: (value: { label: string; value: string; img?: string | undefined } | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = (
    { setIsCheckedNew,
        setIsCheckedUsed,
        setMinPriceValue,
        setMaxPriceValue,
        setValue }) => {
    const dispatch: AppDispatch = useDispatch();
    const { categories, loading, error } = useSelector(categoriesStateSelector);
    const navigate = useNavigate();
    let { categoryName } = useParams();

    const [categoryOpen, setCategoryOpen] = useState(true);
    const [categoryListOpen, setCategoryListOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        dispatch(categoryListFetch());
        setSelectedCategory(categoryName ? categoryName : '');
    }, [dispatch]);

    const categoryHandleClick = () => {
        setCategoryOpen(!categoryOpen);
    }

    const categoryListHandleClick = () => {
        setCategoryListOpen(!categoryListOpen);
    }

    const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement>) => {
        setIsCheckedNew(false);
        setIsCheckedUsed(false);
        setMinPriceValue('');
        setMaxPriceValue('');
        setValue(null);
        dispatch(productFilterGoodtypeAction(''));
        dispatch(productFilterPriceAction(''));
        dispatch(productFilterLocationAction(''));
        localStorage.removeItem('goodtype');
        localStorage.removeItem('price');
        localStorage.removeItem('location');
        const categoryName = event.currentTarget.getAttribute('value');
        setSelectedCategory(categoryName ? categoryName : '');
        navigate(`/${categoryName}`);
    };

    return (
        <List disablePadding>
            <FormLabel>
                <ListItemButton onClick={categoryHandleClick}>
                    <FilterText primary="Категорія" />
                    {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </FormLabel>
            <CategoryCollapse in={categoryOpen} timeout="auto" unmountOnExit>
                <FormLabel>
                    <ListItemButton onClick={categoryListHandleClick} >
                        <CurrentCategoryListItemText primary={categoryNames[`${categoryName}`]} />
                        {categoryListOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </FormLabel>

                <Collapse in={categoryListOpen} timeout="auto" unmountOnExit>
                    <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }} size="small">
                        <CategoryList>

                            {!loading &&
                                !error &&
                                categories.map(({ name, _id }) => {
                                    return <ListItem
                                        key={_id}
                                        value={name}
                                        onClick={handleCategoryClick}
                                        disablePadding>
                                        <ListItemButton sx={{
                                            backgroundColor: selectedCategory === name ? '#F8F8FD' : 'initial',
                                        }}
                                        >
                                            <CategoryListItemText primary={categoryNames[`${name}`]}
                                                primaryTypographyProps={{
                                                    color: selectedCategory === name ? '#3860E2' : '#1B2124',
                                                    fontWeight: selectedCategory === name ? '700' : '500',
                                                    variant: 'body1',
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                })}
                        </CategoryList>
                    </FormControl>
                </Collapse>
            </CategoryCollapse>
        </List >
    )
}

export default CategoryFilter;