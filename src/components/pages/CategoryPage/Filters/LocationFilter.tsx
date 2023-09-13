import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { productFilterLocationAction } from "../reducer";
import { productsStateSelector } from "../selector";

import {
    List, Autocomplete, Box, TextField, FormLabel,
    ListItemButton,

} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { locations } from '../../../../constants'; // Translate

import locationIcon from '../../../../img/locations/location.svg';

import {
    FilterText, LocationCollapse
} from "../style";

interface CategoryFilterProps {
    value: { label: string; value: string; img?: string | undefined } | null;
    setValue: (value: { label: string; value: string; img?: string | undefined } | null) => void;
}

const LocationFilter: React.FC<CategoryFilterProps> = ({ value, setValue }) => {
    const dispatch: AppDispatch = useDispatch();
    const { filterBy } = useSelector(productsStateSelector);

    const [locationOpen, setLocationOpen] = useState(true);
    const [inputValue, setInputValue] = React.useState('');
    const filteredLocations = inputValue ? locations : locations.slice(0, 10);

    useEffect(() => {
        const storedFilterByLocation = localStorage.getItem('location');
        if (storedFilterByLocation) {
            const savedFilterLocation = /=(.+)/.exec(storedFilterByLocation);
            if (savedFilterLocation) {
                const locationAfterReload = locations.filter(obj => obj.value === savedFilterLocation[1])[0];
                setValue(locationAfterReload);
            }
            dispatch(productFilterLocationAction(storedFilterByLocation));
        } else {
            const locationAfterReload = locations.filter(obj => obj.value === 'Ukraine')[0];
            setValue(locationAfterReload);
        }
    }, [])

    const locationHandleClick = () => {
        setLocationOpen(!locationOpen);
    }

    const handleChange = (event: React.ChangeEvent<{}>, newValue: { label: string; value: string; img?: string | undefined } | null) => {
        setValue(newValue);
        if (newValue) {
            let newFilterByLocation = '';
            newFilterByLocation = newValue.value === 'Ukraine' ? '' : `&location=${newValue.value}`;

            const newFilterBy = { ...filterBy, location: newFilterByLocation };
            dispatch(productFilterLocationAction(newFilterBy.location))
            localStorage.setItem("location", newFilterBy.location);
        } else {
            dispatch(productFilterLocationAction(''))
            localStorage.removeItem("location");
        }
    }

    return (
        <List disablePadding>
            <FormLabel>
                <ListItemButton onClick={locationHandleClick}>
                    <FilterText primary="Локація" />
                    {locationOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </FormLabel>
            <LocationCollapse in={locationOpen} timeout="auto" unmountOnExit>
                <Autocomplete
                    value={value}
                    onChange={handleChange}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    disablePortal
                    id="combo-box-demo"
                    options={filteredLocations}
                    getOptionDisabled={(option) =>
                        option === locations[1] ||
                        option === locations[10] ||
                        option === locations[45] ||
                        option === locations[46] ||
                        option === locations[47] ||
                        option === locations[48] ||
                        option === locations[49] ||
                        option === locations[50]
                    }
                    sx={{ maxWidth: 300 }}

                    renderOption={(props, option: { value: string, img?: string, label: string }) => (
                        <Box component="li"
                            sx={{
                                color: '#1B2124',
                                backgroundColor: 'white',
                                pt: '.5rem',
                                pb: '.5rem',
                                '& > img': { mr: 2, flexShrink: 0 }
                            }} {...props}>
                            {/* {option.img && */}
                            <img
                                loading="lazy"
                                width="30"
                                src={option.img || locationIcon}
                                srcSet={`/w40/${option.value}.png 2x`}
                                alt=""
                            />
                            {/* // } */}
                            {option.label}
                        </Box>
                    )}

                    renderInput={(params) => <TextField {...params} placeholder="Вся Україна" />}
                />
            </LocationCollapse>
        </List >
    )
}

export default LocationFilter;