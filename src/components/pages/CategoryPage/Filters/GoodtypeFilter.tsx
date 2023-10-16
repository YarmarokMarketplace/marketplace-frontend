import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { productFilterGoodtypeAction } from "../reducer";
import { productsStateSelector } from "../selector";

import {
    Checkbox, FormLabel,
    ListItemButton, Collapse,
    RadioGroup,
    Stack
} from "@mui/material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
    FilterText, GoodtypeFormControlLabel, GoodtypeFormControlLabelMobile
} from "../style";

interface CategoryFilterProps {
    іsCheckedNew: boolean;
    іsCheckedUsed: boolean;
    setIsCheckedNew: (value: boolean) => void;
    setIsCheckedUsed: (value: boolean) => void;
}

const GoodtypeFilter: React.FC<CategoryFilterProps> = (
    { іsCheckedNew,
        іsCheckedUsed,
        setIsCheckedNew,
        setIsCheckedUsed,
    }) => {
    const dispatch: AppDispatch = useDispatch();
    const theme = useTheme();
    console.log('іsCheckedUsed ' + іsCheckedUsed);
    console.log('іsCheckedNew ' + іsCheckedNew);

    const [typeOpen, setTypeOpen] = React.useState(true);
    const { filterBy } = useSelector(productsStateSelector);
    const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const storedFilterByType = localStorage.getItem('goodtype');
        if (storedFilterByType) {
            dispatch(productFilterGoodtypeAction(storedFilterByType));
            storedFilterByType.includes('new') ? setIsCheckedNew(true) : setIsCheckedNew(false);
            storedFilterByType.includes('used') ? setIsCheckedUsed(true) : setIsCheckedUsed(false);
        }

    }, [dispatch, іsCheckedNew, іsCheckedUsed]);

    const goodtypeHandleClick = () => {
        setTypeOpen(!typeOpen);
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

    return (
        <>
            {!isMdScreen ?
                (
                    <>
                        <FormLabel>
                            <ListItemButton onClick={goodtypeHandleClick} sx={{ mb: '.5rem' }}>
                                <FilterText primary="За станом" />
                                {typeOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </FormLabel >
                        <Collapse in={typeOpen} timeout="auto" unmountOnExit
                            onChange={handleGoodtypeChange}>
                            <RadioGroup sx={{ mb: 1 }}>
                                <GoodtypeFormControlLabel
                                    className="filters"
                                    value="new"
                                    control={<Checkbox checked={іsCheckedNew} />}
                                    label="Нове" />
                                <GoodtypeFormControlLabel
                                    className="filters"
                                    value="used"
                                    control={<Checkbox checked={іsCheckedUsed} />}
                                    label="Вживане" />
                            </RadioGroup>
                        </Collapse>
                    </>
                ) :
                (
                    <Stack
                        direction='row'
                        alignItems='baseline'
                        onChange={handleGoodtypeChange}
                    >
                        <FilterText primary="За станом" />
                        <RadioGroup sx={{
                            mb: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            // columnGap: '1rem'
                        }}>
                            <GoodtypeFormControlLabelMobile
                                sx={{
                                    borderColor: іsCheckedNew ? theme.palette.primary.main : theme.palette.text.disabled,
                                    '& .MuiTypography-root': {
                                        color: іsCheckedNew ? theme.palette.primary.main : theme.palette.text.primary,
                                    }
                                }}
                                value="new"
                                control={<Checkbox checked={іsCheckedNew} sx={{ display: 'none' }} />}
                                label="Нове" />
                            <GoodtypeFormControlLabelMobile
                                sx={{
                                    borderColor: іsCheckedUsed ? theme.palette.primary.main : theme.palette.text.disabled,
                                    '& .MuiTypography-root': {
                                        color: іsCheckedUsed ? theme.palette.primary.main : theme.palette.text.primary,
                                    },
                                }}
                                value="used"
                                control={<Checkbox checked={іsCheckedUsed} sx={{ display: 'none' }} />}
                                label="Вживане" />
                        </RadioGroup>
                    </Stack>
                )
            }

        </>
    )
}

export default GoodtypeFilter;