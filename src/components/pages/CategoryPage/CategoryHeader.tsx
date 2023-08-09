
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { productsStateSelector } from "./selector";

import { Typography, Stack } from "@mui/material";

import { StyledChip } from "./style";
import { categoryNames } from "../../../constants";

const CategoryHeader: React.FC = () => {
  const { products } = useSelector(productsStateSelector);
  let { categoryName } = useParams();

  return (
    <Stack direction="row">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mr: '1rem',
          mb: 0,
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
