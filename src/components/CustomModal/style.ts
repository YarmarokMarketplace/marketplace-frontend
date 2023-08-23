import { IconButton, Box, styled } from "@mui/material";


export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: ".8rem",
    right: ".8rem"
}))

export const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "36.75rem",
    backgroundColor: '#FFF',
    borderRadius: "32px",
    boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
    padding: theme.spacing(6, 3)
}))