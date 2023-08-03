import React from "react";
import { Typography, Stack } from "@mui/material";

import { StyledChip } from "./style";
import { useParams } from "react-router-dom";
import { categoryNames } from "../../../constants";
import { useSelector } from "react-redux";
import { productsStateSelector } from "./selector";

const CategoryHeader: React.FC = () => {
  const { categoryName } = useParams();
  const { products } = useSelector(productsStateSelector);
  return (
    <Stack direction="row">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mr: "1rem",
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        {categoryNames[`${categoryName}`]}
      </Typography>
      <StyledChip label={products.totalResult} size="small" />
    </Stack>
  );
};

export default CategoryHeader;
