import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { productsResultStateSelector } from 'redux/products/selector';

import { categoryWithoutGoodtype } from 'src/constants';
import { FiltersContainer } from './style';
import CategoryFilter from './Filters/CategoryFilter';
import GoodtypeFilter from './Filters/GoodtypeFilter';
import PriceFilter from './Filters/PriceFilter';
import LocationFilter from './Filters/LocationFilter';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CategoryFilterModal from './CategoryFilterModal';
import RatingFilter from './Filters/RatingFilter';

interface CategoryFiltersProps {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  openFilterModal,
  setOpenFilterModal,
}) => {
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
  const { categoryName } = useParams();

  const { maxPriceInCategory } = useSelector(productsResultStateSelector);

  const isGoodType =
    categoryName && !categoryWithoutGoodtype.includes(categoryName);

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isMdScreen && (
        <FiltersContainer>
          <CategoryFilter
            setIsCheckedNew={setIsCheckedNew}
            setIsCheckedUsed={setIsCheckedUsed}
            setMinPriceValue={setMinPriceValue}
            setMaxPriceValue={setMaxPriceValue}
            setValue={setValue}
            setRatingValue={setRatingValue}
          />
          {isGoodType && (
            <GoodtypeFilter
              setIsCheckedNew={setIsCheckedNew}
              setIsCheckedUsed={setIsCheckedUsed}
              іsCheckedNew={isCheckedNew}
              іsCheckedUsed={isCheckedUsed}
            />
          )}

          <PriceFilter
            minPriceValue={minPriceValue}
            setMinPriceValue={setMinPriceValue}
            maxPriceValue={maxPriceValue}
            setMaxPriceValue={setMaxPriceValue}
            maxPrice={maxPriceInCategory}
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
              setValue={setValue}
              setRatingValue={setRatingValue}
            />
            <LocationFilter value={value} setValue={setValue} />
            <PriceFilter
              minPriceValue={minPriceValue}
              setMinPriceValue={setMinPriceValue}
              maxPriceValue={maxPriceValue}
              setMaxPriceValue={setMaxPriceValue}
              maxPrice={maxPriceInCategory}
            />
            {isGoodType && (
              <GoodtypeFilter
                setIsCheckedNew={setIsCheckedNew}
                setIsCheckedUsed={setIsCheckedUsed}
                іsCheckedNew={isCheckedNew}
                іsCheckedUsed={isCheckedUsed}
              />
            )}
            <RatingFilter
              ratingValue={ratingValue}
              setRatingValue={setRatingValue}
            />
          </FiltersContainer>
        </CategoryFilterModal>
      )}
    </>
  );
};

export default CategoryFilters;
