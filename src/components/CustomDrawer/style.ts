import { Drawer, styled } from "@mui/material";

export const StyledCustomDrawer = styled(Drawer)(({ theme }) => ({
  ".MuiDrawer-paperAnchorRight": {
    width: "25rem",
    padding: theme.spacing(8, 2),
    backgroundColor: theme.palette.white,
  },
}));
