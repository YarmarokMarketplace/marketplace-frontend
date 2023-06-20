import { Button, Stack, styled } from "@mui/material";

export const SearchWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  boxShadow: "rgba(151, 159, 183, 0.15)",
  marginTop: theme.spacing(2),
  alignItems: "center",
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 5),
}));
