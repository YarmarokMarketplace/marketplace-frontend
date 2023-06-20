import {
  AppBar,
  Button,
  Toolbar,
  styled,
  ToggleButton,
  IconButton,
  Container,
  Box,
} from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(1, 4),
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  justifyContent: "center",
  padding: theme.spacing(1, 4),
  backgroundColor: "transparent",
}));

export const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 16,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));
export const StyledLogo = styled("img")(({ theme }) => ({
  height: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1, 2),
}));

export const StyledToggleButton = styled(ToggleButton)`
  border: none;
  width: 48px;
  border-left: "1px solid";
  border-color: "black";
  &.Mui-selected {
    background-color: transparent;
  }
`;

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid",
  padding: theme.spacing(1),
  borderColor: theme.palette.secondary.light,
}));

export const CustomDivider = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.text.secondary,
  height: theme.spacing(2.5),
}));
