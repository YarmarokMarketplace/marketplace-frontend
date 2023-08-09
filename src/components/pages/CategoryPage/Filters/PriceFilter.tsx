import React, { useEffect, useRef } from 'react';
import { debounce } from "lodash"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { productFilterPriceAction } from "../reducer";
import { productsStateSelector, productsResultStateSelector } from "../selector";

import {
    Typography, Box, TextField, FormLabel,
    ListItemButton,
} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {
    FilterText
} from "../style";

interface CategoryFilterProps {
    minPriceValue: string;
    maxPriceValue: string;
    setMinPriceValue: (value: string) => void;
    setMaxPriceValue: (value: string) => void;
}

const PriceFilter: React.FC<CategoryFilterProps> = ({ minPriceValue, setMinPriceValue, maxPriceValue, setMaxPriceValue }) => {
    const dispatch: AppDispatch = useDispatch();

    const { maxPriceInCategory } = useSelector(productsResultStateSelector);
    const minPrice = useRef<HTMLInputElement>();
    const maxPrice = useRef<HTMLInputElement>();

    const [priceOpen, setPriceOpen] = React.useState(true);

    const { filterBy } = useSelector(productsStateSelector);

    useEffect(() => {
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
    }, [dispatch]);

    const priceHandleClick = () => {
        setPriceOpen(!priceOpen);
    };

    const debouncedHandlePriceChange = useRef(
        debounce((newFilterByPrice: string) => {
            const filterPrice = /=(\d*)-?(\d*)/g.exec(newFilterByPrice);
            const newFilterBy = { ...filterBy, price: newFilterByPrice };

            if (filterPrice && (parseInt(filterPrice[1]) < parseInt(filterPrice[2]))) {
                dispatch(productFilterPriceAction(newFilterBy.price));
                localStorage.setItem("price", newFilterBy.price);
            }
        }, 500)
    ).current;

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filterNumbers = event.target.value.replace(/\D/g, '');
        event.target.name === 'min' ?
            setMinPriceValue(filterNumbers) :
            setMaxPriceValue(filterNumbers);

        let newFilterByPrice = '';

        if (minPrice.current?.value && maxPrice.current?.value) {
            newFilterByPrice = `&priceRange=${minPrice.current?.value}-${maxPrice.current?.value}`;
        } else if (!minPrice.current?.value && maxPrice.current?.value) {
            newFilterByPrice = `&priceRange=0-${maxPrice.current?.value}`;
        } else if (minPrice.current?.value && !maxPrice.current?.value) {
            setMaxPriceValue(maxPriceInCategory.toString());
            newFilterByPrice = `&priceRange=${minPrice.current?.value}-${maxPriceInCategory}`;
        }
        debouncedHandlePriceChange(newFilterByPrice);
    }

    return (
        <>
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
                        '& > :not(style)': { m: .5 },
                        display: "flex",
                        alignItems: "baseline",
                        mt: 2,
                        mb: 3
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography className="filters">Ціна:</Typography>
                    <TextField
                        size="small" id="minPrice-textfield" label="Від" variant="outlined" name="min"
                        value={minPriceValue}
                        inputRef={minPrice} />
                    <TextField
                        size="small" id="maxPrice-textfield" label="До" variant="outlined" name="max"
                        value={maxPriceValue}
                        inputRef={maxPrice} />
                </Box>
            </Collapse>
        </>
    )
}

export default PriceFilter;