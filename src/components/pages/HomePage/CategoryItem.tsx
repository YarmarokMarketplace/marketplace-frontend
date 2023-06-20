import React from "react";
import { StyledCard, StyledImgWrapper, StyledItemWrapper } from "./style";
import { CardActionArea, CardContent, Typography } from "@mui/material";

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
      <Typography minHeight={60} variant="h6">
        {category}
      </Typography>
    </StyledItemWrapper>
  );
};

export default CategoryItem;
