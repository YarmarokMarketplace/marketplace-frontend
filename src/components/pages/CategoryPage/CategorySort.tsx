import React from "react";
import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { productsStateSelector } from "./selector";
import { AppDispatch } from "../../../store";

import { currentPageSetAction, productSortAction } from "./reducer";

const CategorySort: React.FC = () => {
  const { sort } = useSelector(productsStateSelector);
  const dispatch: AppDispatch = useDispatch();

  const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: "none",
    minHeight: 5,
    fontSize: "1rem",
    fontWeight: 500,
    "&.Mui-selected": {
      color: "black",
      zIndex: 1,
    },
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    localStorage.setItem("sort", newValue);
    dispatch(productSortAction(newValue));
    dispatch(currentPageSetAction(1));
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        spacing={3}
      >
        <Typography variant="body1" fontWeight="bold" gutterBottom>
          Сортувати за:
        </Typography>
        <Tabs
          variant="standard"
          //Styling outside the .tsx disables animation
          sx={{
            minHeight: "2rem",
            height: "2.375rem",
            borderRadius: 3,
            padding: 0.7,
            bgcolor: "background.paper",
            "& .MuiTabs-flexContainer": {
              maxHeight: "100%",
            },
            "& .MuiTabs-indicator": {
              height: "100%",
              borderRadius: "12px",
              bgcolor: "#FFF",
            },
          }}
          value={sort}
          onChange={handleChange}
        >
          <StyledTab value="newest" label="За новизною" />
          <StyledTab value="cheapest" label="Дешевше" />
          <StyledTab value="expensive" label="Дорожче" />
        </Tabs>
      </Stack>
    </Box>
  );
};

export default CategorySort;
