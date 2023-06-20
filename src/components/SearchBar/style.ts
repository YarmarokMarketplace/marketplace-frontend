import { Button, Stack, styled } from "@mui/material";

export const SearchWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  boxShadow: "rgba(151, 159, 183, 0.15)",
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  width: theme.spacing(18),
}));
