import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { FiltersContainer } from '../CategoryPage/style';
import GoodtypeFilter from '../CategoryPage/Filters/GoodtypeFilter';
import PriceFilter from '../CategoryPage/Filters/PriceFilter';
import LocationFilter from '../CategoryPage/Filters/LocationFilter';
import { productsStateSelector } from 'redux/products/selector';
import CategoryFilter from '../CategoryPage/Filters/CategoryFilter';

const SearchFilters: React.FC = () => {
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

  return (
    <FiltersContainer>
      <CategoryFilter
        setIsCheckedNew={setIsCheckedNew}
        setIsCheckedUsed={setIsCheckedUsed}
        setMinPriceValue={setMinPriceValue}
        setMaxPriceValue={setMaxPriceValue}
        setValue={setValue}
      />
      <GoodtypeFilter
        setIsCheckedNew={setIsCheckedNew}
        setIsCheckedUsed={setIsCheckedUsed}
        іsCheckedNew={isCheckedNew}
        іsCheckedUsed={isCheckedUsed}
      />

      <PriceFilter
        minPriceValue={minPriceValue}
        setMinPriceValue={setMinPriceValue}
        maxPriceValue={maxPriceValue}
        setMaxPriceValue={setMaxPriceValue}
        maxPrice={maxPriceInSearchResult}
      />
      <LocationFilter value={value} setValue={setValue} />
    </FiltersContainer>
  );
};

export default SearchFilters;
