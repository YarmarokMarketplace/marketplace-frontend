import React from "react";

import {
  StyledCard,
  StyledCardContent,
  StyledCategoryLink,
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

const CategoryItem: React.FC<CategotyItemProp> = ({ category, children }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/${category.name}`);
  };

  return (
    <StyledItemWrapper spacing={2}>
      <StyledCard>
        <CardActionArea onClick={handleItemClick}>
          <StyledCardContent>
            <StyledImgWrapper>{children}</StyledImgWrapper>
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
