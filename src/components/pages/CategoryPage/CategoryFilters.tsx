import React from 'react';

import { Typography, Box, Checkbox } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';

import {
    FiltersContainer,
    FilterText
} from "./style";

const CategoryFilters: React.FC = () => {
    const [usedOpen, setUsedOpen] = React.useState(true);
    const [priceOpen, setPriceOpen] = React.useState(true);

    const usedHandleClick = () => {
        setUsedOpen(!usedOpen);
    };

    const priceHandleClick = () => {
        setPriceOpen(!priceOpen);
    };

    const [value, setValue] = React.useState('Нове');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FiltersContainer>

            <FormLabel
                onClick={usedHandleClick}
                id="demo-controlled-radio-buttons-group">
                <ListItemButton onClick={usedHandleClick}>
                    <FilterText primary="За станом" />
                    {usedOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </FormLabel>
            <Collapse in={usedOpen} timeout="auto" unmountOnExit>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >

                    <FormControlLabel className="filters" value="Нове" control={<Checkbox defaultChecked />} label="Нове" />
                    <FormControlLabel className="filters" value="Вживане" control={<Checkbox defaultChecked />} label="Вживане" />
                </RadioGroup>
            </Collapse>

            <ListItemButton onClick={priceHandleClick}>
                <FilterText primary="За ціною" />
                {priceOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={priceOpen} timeout="auto" unmountOnExit>
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
                    <TextField size="small" id="outlined-basic" label="Від" variant="outlined" />
                    <TextField size="small" id="outlined-basic" label="До" variant="outlined" />
                </Box>
            </Collapse>

        </FiltersContainer>
    )
};

export default CategoryFilters;
