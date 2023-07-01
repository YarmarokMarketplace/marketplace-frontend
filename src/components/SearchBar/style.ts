import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  styled,
} from "@mui/material";

export const SearchWrapper = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 7),
  margin: theme.spacing(3, 0),
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
  boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
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
