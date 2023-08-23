import {
    Box, List, Button
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const MenuContainer = styled(Box)(({ theme }) => ({
    width: theme.spacing(39),
    borderRadius: 20,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.white,
    boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
}))

export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.divider,
    ":hover": {
        color: theme.palette.text.disabled,
    },
}));


export const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.divider,
    marginLeft: "-.5rem"
}));

export const StyledList = styled(List)(({ theme }) => ({
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 185,
    paddingTop: 0,
    paddingBottom: 0,
    borderTop: `1px solid ${theme.palette.lightGrey.dark}`,
}))

