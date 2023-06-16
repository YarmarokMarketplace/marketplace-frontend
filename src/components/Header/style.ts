import { AppBar, Button, Toolbar, styled, ToggleButton } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: "none",
  justifyContent: "center",
  padding: theme.spacing(1, 5),
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
`;
