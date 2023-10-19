import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { productsResultStateSelector } from 'redux/products/selector';

import { FiltersContainer } from './style';
import CategoryFilter from './Filters/CategoryFilter';
import GoodtypeFilter from './Filters/GoodtypeFilter';
import PriceFilter from './Filters/PriceFilter';
import LocationFilter from './Filters/LocationFilter';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CategoryFilterModal from './CategoryFilterModal';

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

  const { isGoodType, maxPriceInCategory } = useSelector(
    productsResultStateSelector
  );

  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
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
          </FiltersContainer>
        </CategoryFilterModal>
      )}
    </>
  );
};

export default CategoryFilters;
