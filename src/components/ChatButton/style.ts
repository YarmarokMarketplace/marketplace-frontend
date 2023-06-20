import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 200,
  padding: theme.spacing(1, 3),
  position: "fixed",
  right: 30,
  bottom: 20,
  zIndex: 1002,
  // backgroundColor: theme.palette.primary.dark,
  // ":hover": {
  //   backgroundColor: theme.palette.primary.main,
  // },
}));
