import {
  Box,
  Card,
  CardContent,
  Container,
  Skeleton,
  Stack,
  styled,
} from "@mui/material";

import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  position: "relative",
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "1.125rem",
  fontWeight: 500,
  color: theme.palette.primary.main,
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

export const StyledCategoryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "start",
  gap: theme.spacing(4.5),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(8),
}));

export const StyledItemWrapper = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  width: 190,
  height: 160,
}));

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));
export const StyledImage = styled("img")(({ theme }) => ({
  width: "75%",
  height: "100%",
  aspectRatio: 3 / 2,
  objectFit: "contain",
  "&.help": {
    position: "absolute",
    left: 0,
  },
  "&.exchange": {
    width: "120%",
  },
  "&.resize": {
    height: "65%",
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 40,
  boxShadow: "none",
  ":hover ~": {
    a: {
      color: theme.palette.primary.main,
    },
  },
}));

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: 40,
  height: 160,
  width: 190,
}));

export const StyledTextSkeleton = styled(Skeleton)(({ theme }) => ({
  height: 60,
  width: 190,
}));

export const StyledCategoryLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "1.125rem",
  fontWeight: 500,
  minHeight: 55,
  maxWidth: 190,
  color: theme.palette.text.primary,
  ":hover": {
    color: theme.palette.primary.main,
  },
}));
