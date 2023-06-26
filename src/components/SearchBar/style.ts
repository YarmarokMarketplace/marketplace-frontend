import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  styled,
} from "@mui/material";

export const SearchWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 7),
  boxShadow: "rgba(151, 159, 183, 0.15)",
  marginTop: theme.spacing(2),
  alignItems: "center",
}));

export const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 5),
  position: "absolute",
  right: theme.spacing(3),
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  ".MuiInputBase-root": {
    height: theme.spacing(10),
    borderRadius: 16,
  },
  ".MuiOutlinedInput-root": {
    fieldset: {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.disabled,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));
