import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.main,
  ":hover": {
    textDecoration: "underline",
  },
}));
