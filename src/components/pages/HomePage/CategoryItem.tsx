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

  const handleItemClick = () => {
    navigate("/category");
  };

  return (
    <StyledItemWrapper spacing={2}>
      <StyledCard>
        <CardActionArea onClick={handleItemClick}>
          <CardContent>
            <StyledImgWrapper>{children}</StyledImgWrapper>
          </CardContent>
        </CardActionArea>
      </StyledCard>
      <Box sx={{ minHeight: 60, maxWidth: 165 }}>
        <StyledCategoryLink to="/category">{category}</StyledCategoryLink>
      </Box>
    </StyledItemWrapper>
  );
};

export default CategoryItem;
