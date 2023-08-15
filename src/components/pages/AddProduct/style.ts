import {
  Box,
  Container,
  FormControl,
  FormLabel,
  TextField,
  styled,
} from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(61.5rem, 1fr) minmax(19.5rem, 1fr)",
  gap: theme.spacing(3),
  padding: theme.spacing(2, 0),
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing(16.5),
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 700,
}));

export const StyledFileInput = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  width: "100%",
  padding: theme.spacing(3),
  flexDirection: "column",
  borderRadius: 12,
  ":hover": {
    borderColor: theme.palette.text.primary,
  },
  ":active": {
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledFileLable = styled("label")(({ theme }) => ({
  color: theme.palette.divider,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "0.75rem",
}));
