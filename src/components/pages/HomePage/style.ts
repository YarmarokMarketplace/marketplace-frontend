import { Box, Button, Card, Container, Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const SearchWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  boxShadow: "rgba(151, 159, 183, 0.15)",
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  width: theme.spacing(18),
}));

export const CategoriesWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "1.12rem",
  color: theme.palette.primary.main,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 1),
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(4),
  alignItems: "center",
  justifyContent: "space-between",
}));

export const StyledItemWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
  maxWidth: 200,
  textAlign: "center",
}));

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 40,
}));
export const StyledImage = styled("img")(({ theme }) => ({
  height: 100,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 40,
  boxShadow: "none",
}));
