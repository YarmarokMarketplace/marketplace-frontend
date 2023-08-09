import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { productFilterGoodtypeAction, productFilterPriceAction, productFilterLocationAction } from "../CategoryPage/reducer";

import {
  StyledCard,
  StyledCardContent,
  StyledCategoryLink,
  StyledImage,
  StyledImgWrapper,
  StyledItemWrapper,
} from "./style";
import { CardActionArea } from "@mui/material";

import { useNavigate } from "react-router";

import { CategoryItem } from "../../../types";
import { categoryNames } from "../../../constants";

interface CategotyItemProp {
  category: CategoryItem;
}

const CategoryItem: React.FC<CategotyItemProp> = ({ category }) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(productFilterGoodtypeAction(''));
    dispatch(productFilterPriceAction(''));
    dispatch(productFilterLocationAction(''));
    localStorage.removeItem('goodtype');
    localStorage.removeItem('price');
    localStorage.removeItem('location');
    navigate(`/${category.name}`);
  };

  const className: { [key: string]: string } = {
    help: "help",
    exchange: "exchange",
    "for-free": "resize",
    "home-and-garden": "resize",
  };

  return (
    <StyledItemWrapper spacing={2}>
      <StyledCard>
        <CardActionArea
          id={`btn-${category._id.slice(20)}`}
          onClick={handleItemClick}
        >
          <StyledCardContent>
            <StyledImgWrapper>
              <StyledImage
                id={`category-${category._id.slice(20)}`}
                src={category.photo}
                alt={`${category.name} image`}
                className={className[category.name]}
              />
            </StyledImgWrapper>
          </StyledCardContent>
        </CardActionArea>
      </StyledCard>
      <StyledCategoryLink to={`/${category.name}`}>
        {categoryNames[category.name]}
      </StyledCategoryLink>
    </StyledItemWrapper>
  );
};

export default CategoryItem;
