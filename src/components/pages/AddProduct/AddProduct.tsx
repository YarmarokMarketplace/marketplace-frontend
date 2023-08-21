import React, { useEffect } from "react";

import { InfoBlock } from "./InfoBlock";
import { StyledContainer } from "./style";
import { ProductForm } from "./ProductForm";
import { addAdvertStateSelector } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { resetAddAdvertStateAction } from "./reducer";

const AddProduct = () => {
  const { loading, error, data } = useSelector(addAdvertStateSelector);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetAddAdvertStateAction());
    };
  }, []);
  return (
    <StyledContainer maxWidth="xl" disableGutters>
      {!loading && !error && data ? (
        <Stack spacing={3} paddingTop={3}>
          <Typography variant="h4">
            Вітаємо! Ваше оголошення успішно опубліковано
          </Typography>
          <Stack width="50%" direction="row" spacing={3}>
            <Button
              to={"/"}
              component={Link}
              sx={{ width: "10rem" }}
              variant="contained"
            >
              На головну
            </Button>
            <Button
              to={`/${data?.category}/${data?._id}`}
              component={Link}
              variant="outlined"
            >
              Переглянути оголошення
            </Button>
          </Stack>
        </Stack>
      ) : (
        <>
          <ProductForm />
          <InfoBlock />
        </>
      )}
    </StyledContainer>
  );
};

export default AddProduct;
