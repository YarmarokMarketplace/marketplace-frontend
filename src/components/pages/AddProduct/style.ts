import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Select,
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
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  fontWeight: 700,
}));

export const StyledFileInput = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  width: "47.5rem",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "center",
  gap: theme.spacing(2),
  borderRadius: 12,
  ":hover": {
    borderColor: theme.palette.text.primary,
  },
  ":active": {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledFileLable = styled("label")(({ theme }) => ({
  color: theme.palette.divider,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  fontSize: "0.75rem",
  width: "6.5rem",
}));

export const StyledPreview = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: "100%",
  objectFit: "cover",
  borderRadius: 12,
}));

export const menuStyles = {
  height: "15rem",
  scrollbarWidth: "auto",
  scrollbarColor: "#ffffff #808080",
  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    width: "0.6em",
  },
  "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
};
