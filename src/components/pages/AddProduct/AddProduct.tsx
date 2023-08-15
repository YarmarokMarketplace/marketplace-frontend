import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import SearchBar from "../../SearchBar";
import { InfoBlock } from "./InfoBlock";
import { StyledContainer } from "./style";
import { ProductForm } from "./ProductForm";

const AddProduct = () => {
  return (
    <StyledContainer maxWidth="xl" disableGutters>
      <ProductForm />
      <InfoBlock />
    </StyledContainer>
  );
};

export default AddProduct;
