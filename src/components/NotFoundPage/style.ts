import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledImg = styled("img")(({ theme }) => ({
    marginBottom: theme.spacing(5),
    width: "28rem",
}))

export const StyledStack = styled(Stack)(({ theme }) => ({
    margin: theme.spacing(8, 0)
}))