import { Box, Card, Container, Skeleton, Stack, styled } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 7),
  position: "relative",
}));

export const CategoriesWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 7),
  marginTop: theme.spacing(1),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "1.12rem",
  color: theme.palette.primary.main,
  ":hover": {
    color: theme.palette.primary.main,
  },
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
  ":hover ~": {
    "div a": {
      color: theme.palette.primary.main,
    },
  },
}));

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 40,
  height: 165,
  width: 165,
}));

export const StyledCategoryLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "1.125rem",
  fontWeight: 400,
  color: theme.palette.text.primary,
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

export const StyledMoreIcon = styled(MoreHorizIcon)(({ theme }) => ({
  padding: theme.spacing(2),
  height: 100,
  width: 100,
  fontSize: "0.8rem",
}));
