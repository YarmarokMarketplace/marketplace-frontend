import React from "react";
import {
  StyledCard,
  StyledCategoryLink,
  StyledImgWrapper,
  StyledItemWrapper,
} from "./style";
import { CardActionArea, CardContent, Box } from "@mui/material";

interface CategotyItemProp {
  category: string;
}

const CategoryItem: React.FC<CategotyItemProp> = ({ category, children }) => {
  return (
    <StyledItemWrapper spacing={2}>
      <StyledCard>
        <CardActionArea>
          <CardContent>
            <StyledImgWrapper>{children}</StyledImgWrapper>
          </CardContent>
        </CardActionArea>
      </StyledCard>
      <Box sx={{ minHeight: 60 }}>
        <StyledCategoryLink to="/category">{category}</StyledCategoryLink>
      </Box>
    </StyledItemWrapper>
  );
};

export default CategoryItem;
