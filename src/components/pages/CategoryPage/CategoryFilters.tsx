import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { productFilterGoodtypeAction, productFilterPriceAction } from "./reducer";
import { productsStateSelector, productsResultStateSelector } from "./selector";
import { categoriesStateSelector } from "../HomePage/selector";
import { categoryListFetch } from "../HomePage/thunk";

import {
    Typography, Box, Checkbox, FormControlLabel, TextField, FormLabel,
    ListItemButton,
    RadioGroup,
    Select, SelectChangeEvent, MenuItem, FormControl, ListItemText
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { categoryNames } from '../../../constants'; // Translate

import {
    FiltersContainer,
    FilterText
} from "./style";

const CategoryFilters: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    let { categoryName } = useParams();

    const [isCheckedNew, setIsCheckedNew] = useState(false);
    const [isCheckedUsed, setIsCheckedUsed] = useState(false);
    const [minPriceValue, setMinPriceValue] = useState('');
    const [maxPriceValue, setMaxPriceValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [categoryOpen, setCategoryOpen] = useState(true);
    const [categoryListOpen, setCategoryListOpen] = useState(true);
    const [typeOpen, setTypeOpen] = React.useState(true);
    const [priceOpen, setPriceOpen] = React.useState(true);
    const { filterBy } = useSelector(productsStateSelector);
    const { result } = useSelector(productsResultStateSelector);
    const { categories, loading, error } = useSelector(categoriesStateSelector);
    const minPrice = useRef<HTMLInputElement>();
    const maxPrice = useRef<HTMLInputElement>();

    const [age, setAge] = React.useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value);
    // }

    useEffect(() => {
        dispatch(categoryListFetch());
    }, [dispatch]);

    useEffect(() => {
        const storedFilterByType = localStorage.getItem('goodtype');
        if (storedFilterByType) {
            dispatch(productFilterGoodtypeAction(storedFilterByType));
            storedFilterByType.includes('new') ? setIsCheckedNew(true) : setIsCheckedNew(false);
            storedFilterByType.includes('used') ? setIsCheckedUsed(true) : setIsCheckedUsed(false);
        }

        const storedFilterByPrice = localStorage.getItem('price');
        if (storedFilterByPrice) {
            dispatch(productFilterPriceAction(storedFilterByPrice));
            const savedFilterPrice = /=(\d*)-?(\d*)/g.exec(storedFilterByPrice);
            if (savedFilterPrice && savedFilterPrice[1]) {
                setMinPriceValue(savedFilterPrice[1])
            }
            if (savedFilterPrice && savedFilterPrice[2]) {
                setMaxPriceValue(savedFilterPrice[2])
            }
        }
    }, [dispatch, isCheckedNew, isCheckedUsed]);

    const categoryHandleClick = () => {
        setCategoryOpen(!categoryOpen);
    }

    const categoryListHandleClick = () => {
        setCategoryListOpen(!categoryListOpen);
    }

    const usedHandleClick = () => {
        setTypeOpen(!typeOpen);
    };

    const priceHandleClick = () => {
        setPriceOpen(!priceOpen);
    };

    const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement>) => {
        setIsCheckedNew(false);
        setIsCheckedUsed(false);
        dispatch(productFilterGoodtypeAction(''));
        dispatch(productFilterPriceAction(''));
        localStorage.removeItem('goodtype');
        localStorage.removeItem('price');
        const categoryName = event.currentTarget.getAttribute('value');
        setSelectedCategory(categoryName ? categoryName : '');
        navigate(`/${categoryName}`);
    };

    const handleGoodtypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value === 'new' ?
            setIsCheckedNew(event.target.checked) :
            setIsCheckedUsed(event.target.checked);

        let newFilterByGoodtype = '';

        if (event.target.value === filterBy.goodtype && !event.target.checked) {
            newFilterByGoodtype = '';
        } else if (event.target.value === 'new' && !event.target.checked && !filterBy.goodtype) {
            newFilterByGoodtype = '&goodtype=used';
        } else if (event.target.value === 'used' && !event.target.checked && !filterBy.goodtype) {
            newFilterByGoodtype = '&goodtype=new';
        } else if (event.target.checked && !filterBy.goodtype) {
            newFilterByGoodtype = `&goodtype=${event.target.value}`;
        }

        const newFilterBy = { ...filterBy, goodtype: newFilterByGoodtype };

        dispatch(productFilterGoodtypeAction(newFilterBy.goodtype));
        localStorage.setItem("goodtype", newFilterBy.goodtype);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterNumbers = event.target.value.replace(/\D/g, '');
        console.log(filterNumbers)
        event.target.name === 'min' ?
            setMinPriceValue(filterNumbers) :
            setMaxPriceValue(filterNumbers);

        let newFilterByPrice = '';

        if (minPrice.current?.value && maxPrice.current?.value) {
            newFilterByPrice = `&priceRange=${minPrice.current?.value}-${maxPrice.current?.value}`;
        } else if (!minPrice.current?.value && maxPrice.current?.value) {
            newFilterByPrice = `&priceRange=0-${maxPrice.current?.value}`;
        } else if (minPrice.current?.value && !maxPrice.current?.value) {
            // console.log(result)
            const maxValue = Math.max(...result.map(obj => obj.price));
            newFilterByPrice = `&priceRange=${minPrice.current?.value}-${maxValue}`;
        }
        // const filterPrice = /=(\d*)-?(\d*)/g.exec(newFilterByPrice);

        const newFilterBy = { ...filterBy, price: newFilterByPrice };
        // if ((filterPrice) && (filterPrice[1] < filterPrice[2])) {
        // console.log(filterPrice[1] < filterPrice[2])
        dispatch(productFilterPriceAction(newFilterBy.price));
        localStorage.setItem("price", newFilterBy.price)
        // }
    }

    return (
        <FiltersContainer>

            {/* Category filter */}
            <List>
                <FormLabel>
                    <ListItemButton onClick={categoryHandleClick}>
                        <FilterText primary="Категорія" />
                        {categoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </FormLabel>
                <Collapse in={categoryOpen} timeout="auto" unmountOnExit sx={{
                    '& .MuiFormControl-root': {
                        margin: '0 !important'
                    },
                    marginTop: '1rem',
                    marginBottom: '1.5rem',
                    borderRadius: "0.5rem",
                    border: "1px solid #F3F3F3",
                }}>

                    <FormLabel>
                        <ListItemButton onClick={categoryListHandleClick} >
                            <ListItemText primary={categoryNames[`${categoryName}`]}
                                sx={{
                                    padding: '1rem',
                                    '&>span': {
                                        fontSize: "16px",
                                        fontWeight: '700',
                                        color: "#3860E2"
                                    }
                                }} />
                            {categoryListOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </FormLabel>

                    <Collapse in={categoryListOpen} timeout="auto" unmountOnExit>
                        <FormControl sx={{
                            m: 1, minWidth: 120, width: '100%',
                        }} size="small">
                            <List
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    position: 'relative',
                                    overflow: 'auto',
                                    maxHeight: 185,
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    borderTop: "1px solid #F3F3F3"
                                }} >

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
                                                <ListItemText primary={categoryNames[`${name}`]}
                                                    primaryTypographyProps={{
                                                        fontSize: '14px',
                                                        color: selectedCategory === name ? '#3860E2' : 'black',
                                                        fontWeight: selectedCategory === name ? '700' : '500',
                                                        variant: 'body1',
                                                        padding: '.5rem 0 .5rem 1rem'
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    })}
                            </List>
                        </FormControl>
                    </Collapse>
                </Collapse>
            </List>

            {/* Goodtype filter */}
            <FormLabel>
                <ListItemButton onClick={usedHandleClick}>
                    <FilterText primary="За станом" />
                    {typeOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </FormLabel>
            <Collapse in={typeOpen} timeout="auto" unmountOnExit
                onChange={handleGoodtypeChange}>
                <RadioGroup>
                    <FormControlLabel
                        className="filters"
                        value="new"
                        control={<Checkbox checked={isCheckedNew} />}
                        label="Нове" />
                    <FormControlLabel
                        className="filters"
                        value="used"
                        control={<Checkbox checked={isCheckedUsed} />}
                        label="Вживане" />
                </RadioGroup>
            </Collapse>
            {/* Price filter */}
            <FormLabel>
                <ListItemButton onClick={priceHandleClick}>
                    <FilterText primary="За ціною" />
                    {priceOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </FormLabel>
            <Collapse in={priceOpen} timeout="auto" unmountOnExit onChange={handlePriceChange}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                        display: "flex",
                        alignItems: "baseline",
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography className="filters">Ціна:</Typography>
                    <TextField
                        size="small" id="outlined-basic" label="Від" variant="outlined" name="min"
                        value={minPriceValue}
                        inputRef={minPrice} />
                    <TextField
                        size="small" id="outlined-basic" label="До" variant="outlined" name="max"
                        value={maxPriceValue}
                        inputRef={maxPrice} />
                </Box>
            </Collapse>

        </FiltersContainer >
    )
};

export default CategoryFilters;
