import { Box, Button, FormLabel, TextField, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.white,
  width: "22.6rem",
  display: "flex",
  gap: theme.spacing(3),
  flexDirection: "column",
}));

export const StyledLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  marginBottom: theme.spacing(0.5),
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  ".MuiInputBase-root": {
    borderRadius: 8,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  fontSize: "0.875rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  ":hover": {
    color: theme.palette.primary.light,
  },
}));

export const StyledLoginBtn = styled(Button)(({ theme }) => ({
  ":hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.light,
  },
}));

export const StyledVector = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(4),
  borderRadius: "50%",
}));
