import {
  Container,
  styled,
  Box,
  IconButton,
  Button,
  Tab,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  maxWidth: 1440,
}));
export const StyledCurrentImage = styled(Box)(({ theme }) => ({
  height: "42rem",
  display: "flex",
  alignItems: "center",
  border: "2px solid transparent",
  img: {
    borderRadius: 12,
    width: "100%",
    maxHeight: "100%",
  },
}));

export const StyledIndicator = styled("img")(({ theme }) => ({
  width: 108,
  height: 92,
  objectFit: "cover",
}));

export const StyledInfoBlock = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
  borderRadius: 12,
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid",
  padding: theme.spacing(1),
  borderColor: theme.palette.secondary.light,
  ":hover": {
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontSize: "0.875rem",
}));

export const StyledShowButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.875rem",
  ":hover": {
    backgroundColor: theme.palette.text.disabled,
  },
}));

export const StyledDescBlock = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
  boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
  borderRadius: "0px 24px 24px 24px",
  textAlign: "justify",
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  borderRadius: "12px 12px 0px 0px",
  backgroundColor: theme.palette.primary.contrastText,
  fontSize: "1.125rem",
  fontWeight: 700,
  pointerEvents: "none",
  width: "33%",
  padding: theme.spacing(2, 0),
}));

export const StyledCarouselWrapper = styled(Stack)(({ theme, hidden }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.white,
  boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
  borderRadius: 24,
  height: "44.5rem",
  display: hidden ? "none" : "",
}));

export const StyledProductWrapper = styled(Container)(({ theme, hidden }) => ({
  display: "grid",
  gridTemplateColumns: hidden
    ? "1fr"
    : "minmax(43.5rem, 1fr) minmax(37.5rem, 1fr) ",
  gap: theme.spacing(3),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const StyledCrumpsLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.main,
  ":hover": {
    textDecoration: "underline",
  },
}));
