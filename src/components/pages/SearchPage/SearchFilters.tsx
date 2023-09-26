import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { productsResultStateSelector } from "./selector";

import { FiltersContainer } from '../CategoryPage/style';
// import CategoryFilter from './Filters/CategoryFilter';
import GoodtypeFilter from '../CategoryPage/Filters/GoodtypeFilter';
import PriceFilter from '../CategoryPage/Filters/PriceFilter';
import LocationFilter from '../CategoryPage/Filters/LocationFilter';

const SearchFilters: React.FC = () => {
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
      />
      <LocationFilter value={value} setValue={setValue} />
    </FiltersContainer>
  );
};

export default SearchFilters;
