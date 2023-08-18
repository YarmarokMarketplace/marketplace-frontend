import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { productsResultStateSelector } from "./selector";

import { FiltersContainer } from "./style";
import CategoryFilter from './Filters/CategoryFilter';
import GoodtypeFilter from './Filters/GoodtypeFilter';
import PriceFilter from './Filters/PriceFilter';
import LocationFilter from './Filters/LocationFilter';

const CategoryFilters: React.FC = () => {
    const [isCheckedNew, setIsCheckedNew] = useState(false);
    const [isCheckedUsed, setIsCheckedUsed] = useState(false);
    const [minPriceValue, setMinPriceValue] = useState('');
    const [maxPriceValue, setMaxPriceValue] = useState('');
    const [value, setValue] = useState<{ label: string; value: string; img?: string | undefined } | null>(null);

    const { isGoodType } = useSelector(productsResultStateSelector);

    return (
        <FiltersContainer>

            <CategoryFilter
                setIsCheckedNew={setIsCheckedNew}
                setIsCheckedUsed={setIsCheckedUsed}
                setMinPriceValue={setMinPriceValue}
                setMaxPriceValue={setMaxPriceValue}
                setValue={setValue} />
            {
                isGoodType &&
                <GoodtypeFilter
                    setIsCheckedNew={setIsCheckedNew}
                    setIsCheckedUsed={setIsCheckedUsed}
                    іsCheckedNew={isCheckedNew}
                    іsCheckedUsed={isCheckedUsed} />
            }

            <PriceFilter
                minPriceValue={minPriceValue} setMinPriceValue={setMinPriceValue}
                maxPriceValue={maxPriceValue} setMaxPriceValue={setMaxPriceValue} />
            <LocationFilter value={value} setValue={setValue} />

        </FiltersContainer >
    )
};

export default CategoryFilters;
