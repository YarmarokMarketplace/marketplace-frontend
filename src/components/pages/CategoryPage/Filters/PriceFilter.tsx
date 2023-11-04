import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { productFilterPriceAction } from 'redux/products/reducer';
import { productsStateSelector } from 'redux/products/selector';

import {
  Typography,
  Box,
  TextField,
  FormLabel,
  ListItemButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { FilterText } from '../style';

interface CategoryFilterProps {
  minPriceValue: string;
  maxPriceValue: string;
  setMinPriceValue: (value: string) => void;
  setMaxPriceValue: (value: string) => void;
  maxPrice: number;
}

const PriceFilter: React.FC<CategoryFilterProps> = ({
  minPriceValue,
  maxPriceValue,
  setMinPriceValue,
  setMaxPriceValue,
  maxPrice,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const [maxPriceError, setMaxPriceError] = useState(false);

  const minPriceRef = useRef<HTMLInputElement>();
  const maxPriceRef = useRef<HTMLInputElement>();

  const [priceOpen, setPriceOpen] = React.useState(true);
  const theme = useTheme();

  const { filterBy } = useSelector(productsStateSelector);

  useEffect(() => {
    const storedFilterByPrice = localStorage.getItem('price');
    if (storedFilterByPrice) {
      dispatch(productFilterPriceAction(storedFilterByPrice));
      const savedFilterPrice = /=(\d*)-?(\d*)/g.exec(storedFilterByPrice);
      if (savedFilterPrice && savedFilterPrice[1]) {
        setMinPriceValue(savedFilterPrice[1]);
      }
      if (savedFilterPrice && savedFilterPrice[2]) {
        setMaxPriceValue(savedFilterPrice[2]);
      }
    }
  }, [dispatch]);

  const priceHandleClick = () => {
    setPriceOpen(!priceOpen);
  };

  const debouncedHandlePriceChange = useRef(
    debounce((newFilterByPrice: string) => {
      const newFilterBy = { ...filterBy, price: newFilterByPrice };
      dispatch(productFilterPriceAction(newFilterBy.price));
      localStorage.setItem('price', newFilterBy.price);
    }, 500)
  ).current;

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (minPriceRef.current?.value && maxPriceRef.current?.value) {
      if (
        parseFloat(minPriceRef.current.value) >=
        parseFloat(maxPriceRef.current.value)
      ) {
        setMaxPriceError(true);
      } else {
        setMaxPriceError(false);
      }
    }

    const filterNumbers = event.target.value.replace(/\D/g, '');
    event.target.name === 'min'
      ? setMinPriceValue(filterNumbers)
      : setMaxPriceValue(filterNumbers);

    let newFilterByPrice = '';

    console.log('min: ' + minPriceRef.current?.value);
    console.log('max: ' + maxPriceRef.current?.value);
    console.log(maxPrice);

    if (minPriceRef.current?.value && maxPriceRef.current?.value) {
      newFilterByPrice = `&priceRange=${minPriceRef.current?.value}-${maxPriceRef.current?.value}`;
    } else if (!minPriceRef.current?.value && maxPriceRef.current?.value) {
      newFilterByPrice = `&priceRange=0-${maxPriceRef.current?.value}`;
    } else if (
      minPriceRef.current?.value &&
      !maxPriceRef.current?.value &&
      maxPrice
    ) {
      newFilterByPrice = `&priceRange=${minPriceRef.current?.value}-${maxPrice}`;
    } else if (!minPriceRef.current?.value && !maxPriceRef.current?.value) {
      setMaxPriceError(false);
      newFilterByPrice = '';
    }

    debouncedHandlePriceChange(newFilterByPrice);
  };

  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {isMdScreen ? (
        <FilterText primary="За ціною" />
      ) : (
        <FormLabel>
          <ListItemButton onClick={priceHandleClick}>
            <FilterText primary="За ціною" />
            {priceOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </FormLabel>
      )}
      <Collapse
        in={priceOpen}
        timeout="auto"
        unmountOnExit
        onChange={handlePriceChange}
      >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 0.5 },
            display: 'flex',
            alignItems: 'center',
            mt: 2,
            mb: 3,
          }}
          noValidate
          autoComplete="off"
        >
          {!isMdScreen && (
            <Typography className="filters" mr=".3rem !important">
              Ціна:
            </Typography>
          )}
          <TextField
            sx={{ flexGrow: '1' }}
            size="small"
            id="minPrice-textfield"
            label="Від"
            variant="outlined"
            name="min"
            value={minPriceValue}
            inputRef={minPriceRef}
          />
          <TextField
            sx={{ flexGrow: '1' }}
            error={maxPriceError}
            size="small"
            id="maxPrice-textfield"
            label="До"
            variant="outlined"
            name="max"
            value={maxPriceValue}
            inputRef={maxPriceRef}
          />
        </Box>
      </Collapse>
    </>
  );
};

export default PriceFilter;
