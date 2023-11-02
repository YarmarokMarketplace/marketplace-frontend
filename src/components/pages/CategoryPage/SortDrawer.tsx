import React from "react";
import { IconButton } from "@mui/material";
import { StyledSortDrawer } from "./style";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

interface SortProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const SortDrawer: React.FC<SortProps> = ({ children, open, setOpen }) => {

    const handleToggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <>
            <StyledSortDrawer
                variant="temporary"
                open={open}
                anchor="bottom"
                onClose={handleToggleDrawer}
            >
                <>
                    <IconButton
                        sx={{ position: "absolute", top: "1rem", right: "1rem" }}
                        color="inherit"
                        onClick={handleToggleDrawer}
                    >
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                    {children}
                </>
            </StyledSortDrawer>
        </>
    );
};

export default SortDrawer;
