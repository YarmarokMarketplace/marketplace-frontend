import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';
import { productFilterRatingAction } from 'redux/products/reducer';
import { productsStateSelector } from '../../../../redux/products/selector';

import {
  FormControlLabel,
  FormGroup,
  FormLabel,
  Rating,
  Checkbox,
  ListItemButton,
  Collapse,
  Stack,
  Box,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  FilterText,
  GoodtypeFormControlLabel,
  GoodtypeFormControlLabelMobile,
} from '../style';

interface RatingFilterProps {
  ratingValue: string[];
  setRatingValue: React.Dispatch<React.SetStateAction<string[]>>;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  ratingValue,
  setRatingValue,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { filterBy } = useSelector(productsStateSelector);
  const [ratingOpen, setRatingOpen] = React.useState(true);

  const ratingHandleClick = () => {
    setRatingOpen(!ratingOpen);
  };

  useEffect(() => {
    const storedFilterByRating = localStorage.getItem('rating');
    if (storedFilterByRating) {
      setRatingValue(storedFilterByRating.split(','));
      const newRatingValues = storedFilterByRating.split(',');
      let minRatingValue = 0;
      if (newRatingValues.length > 0) {
        minRatingValue = Math.min(...newRatingValues.map(Number));
      }
      const newFilterByRating = `&minSellerRating=${minRatingValue}`;
      const newFilterBy = { ...filterBy, rating: newFilterByRating };
      dispatch(productFilterRatingAction(newFilterBy.rating));
    }
  }, [dispatch, setRatingValue]);

  const handleRatingChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRatingValue((prevRatingValue: string[]) => {
      const updatedRatingValue = event.target.checked
        ? [...prevRatingValue, event.target.value]
        : prevRatingValue.filter((val) => val !== event.target.value);

      let minRatingValue = 0;
      if (updatedRatingValue.length > 0) {
        minRatingValue = Math.min(...updatedRatingValue.map(Number));
      }

      const newFilterByRating = `&minSellerRating=${minRatingValue}`;
      const newFilterBy = { ...filterBy, rating: newFilterByRating };
      dispatch(productFilterRatingAction(newFilterBy.rating));
      localStorage.setItem('rating', updatedRatingValue.join(','));

      return updatedRatingValue;
    });
  };

  return (
    <Stack
      sx={{
        '& .MuiRating-root': { gap: '.5rem' },
      }}
    >
      {!isMdScreen ? (
        <>
          <FormLabel>
            <ListItemButton onClick={ratingHandleClick} sx={{ mb: '.5rem' }}>
              <FilterText primary='За рейтингом продавця' />
              {ratingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </FormLabel>
          <Collapse
            in={ratingOpen}
            timeout='auto'
            unmountOnExit
            onChange={handleRatingChange}
          >
            <FormGroup
              sx={{
                mb: '1rem',
              }}
              aria-labelledby='radio-buttons-group-label'
            >
              {Array.from({ length: 4 }, (_, index) => {
                const rating = 5 - index;
                return (
                  <FormControlLabel
                    key={rating}
                    value={rating}
                    control={
                      <Checkbox
                        checked={ratingValue.includes(String(rating))}
                      />
                    }
                    label={
                      <Rating
                        name='read-only'
                        value={rating}
                        size='small'
                        readOnly
                      />
                    }
                  />
                );
              })}
            </FormGroup>
          </Collapse>
        </>
      ) : (
        <Box onChange={handleRatingChange}>
          <FilterText primary='За рейтингом продавця' sx={{ mb: '.5rem' }} />
          <FormGroup
            sx={{
              mb: '1rem',
            }}
            aria-labelledby='radio-buttons-group-label'
          >
            {Array.from({ length: 4 }, (_, index) => {
              const rating = 5 - index;
              return (
                <FormControlLabel
                  key={rating}
                  value={rating}
                  control={
                    <Checkbox checked={ratingValue.includes(String(rating))} />
                  }
                  label={
                    <Rating
                      name='read-only'
                      value={rating}
                      size='small'
                      readOnly
                    />
                  }
                />
              );
            })}
          </FormGroup>
        </Box>
      )}
    </Stack>
  );
};

export default RatingFilter;
