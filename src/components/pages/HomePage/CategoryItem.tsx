import React from "react";
import {
  StyledCard,
  StyledCategoryLink,
  StyledImgWrapper,
  StyledItemWrapper,
} from "./style";
import { CardActionArea, CardContent, Box } from "@mui/material";
import { useNavigate } from "react-router";

interface CategotyItemProp {
  category: string;
}

const CategoryItem: React.FC<CategotyItemProp> = ({ category, children }) => {
  const navigate = useNavigate();
  return (
    <StyledItemWrapper spacing={2}>
      <StyledCard>
        <CardActionArea onClick={() => navigate("/category")}>
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
