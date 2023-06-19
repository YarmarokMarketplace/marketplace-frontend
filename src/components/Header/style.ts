import {
  AppBar,
  Button,
  Toolbar,
  styled,
  ToggleButton,
  IconButton,
} from "@mui/material";

export const StyledHeader = styled("header")(({ theme }) => ({
  padding: theme.spacing(1, 4),
}));

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  justifyContent: "center",
  padding: theme.spacing(1),
  borderRadius: 16,
}));

export const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLogo = styled("img")(({ theme }) => ({
  height: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  minWidth: theme.spacing(25),
}));

export const StyledToggleButton = styled(ToggleButton)`
  border: none;
  width: 40px;
  &.Mui-selected {
    background-color: transparent;
  }
`;

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid",
  padding: theme.spacing(1),
  borderColor: theme.palette.secondary.light,
}));
