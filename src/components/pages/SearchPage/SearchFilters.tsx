import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { FiltersContainer } from '../CategoryPage/style';
import GoodtypeFilter from '../CategoryPage/Filters/GoodtypeFilter';
import PriceFilter from '../CategoryPage/Filters/PriceFilter';
import LocationFilter from '../CategoryPage/Filters/LocationFilter';
import { productsStateSelector } from 'redux/products/selector';
import CategoryFilter from '../CategoryPage/Filters/CategoryFilter';
import RatingFilter from '../CategoryPage/Filters/RatingFilter';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import CategoryFilterModal from '../CategoryPage/CategoryFilterModal';

interface SearchFiltersProps {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
}
const SearchFilters: React.FC<SearchFiltersProps> = ({
  setOpenFilterModal,
  openFilterModal,
}) => {
  const {
    searchProducts: { maxPriceInSearchResult },
  } = useSelector(productsStateSelector);
  const [isCheckedNew, setIsCheckedNew] = useState(false);
  const [isCheckedUsed, setIsCheckedUsed] = useState(false);
  const [minPriceValue, setMinPriceValue] = useState('');
  const [maxPriceValue, setMaxPriceValue] = useState('');
  const [value, setValue] = useState<{
    label: string;
    value: string;
    img?: string | undefined;
  } | null>(null);

  const [ratingValue, setRatingValue] = useState<string[]>([]);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      {!isMdScreen && (
        <FiltersContainer>
          <CategoryFilter
            setIsCheckedNew={setIsCheckedNew}
            setIsCheckedUsed={setIsCheckedUsed}
            setMinPriceValue={setMinPriceValue}
            setMaxPriceValue={setMaxPriceValue}
            setRatingValue={setRatingValue}
            setValue={setValue}
          />
          <PriceFilter
            minPriceValue={minPriceValue}
            setMinPriceValue={setMinPriceValue}
            maxPriceValue={maxPriceValue}
            setMaxPriceValue={setMaxPriceValue}
            maxPrice={maxPriceInSearchResult}
          />
          <RatingFilter
            ratingValue={ratingValue}
            setRatingValue={setRatingValue}
          />
          <LocationFilter value={value} setValue={setValue} />
        </FiltersContainer>
      )}
      {isMdScreen && (
        <CategoryFilterModal
          openFilterModal={openFilterModal}
          setOpenFilterModal={setOpenFilterModal}
        >
          <FiltersContainer>
            <CategoryFilter
              setIsCheckedNew={setIsCheckedNew}
              setIsCheckedUsed={setIsCheckedUsed}
              setMinPriceValue={setMinPriceValue}
              setMaxPriceValue={setMaxPriceValue}
              setRatingValue={setRatingValue}
              setValue={setValue}
            />
            <PriceFilter
              minPriceValue={minPriceValue}
              setMinPriceValue={setMinPriceValue}
              maxPriceValue={maxPriceValue}
              setMaxPriceValue={setMaxPriceValue}
              maxPrice={maxPriceInSearchResult}
            />
            <RatingFilter
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
            />
            <LocationFilter value={value} setValue={setValue} />
          </FiltersContainer>
        </CategoryFilterModal>
      )}
    </>
  );
};

export default SearchFilters;
