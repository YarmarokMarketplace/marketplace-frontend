import React from "react";
import { IconButton } from "@mui/material";
import { StyledCustomDrawer } from "./style";

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelector } from "./selector";
import { AppDispatch } from "../../store";
import { openDrawerAction } from "./reducer";
import { DrawerContent } from "../../types";

const CustomDrawer = () => {
  const { open, content } = useSelector(drawerSelector);
  const dispatch: AppDispatch = useDispatch();
  const handleToggleDrawer = () => {
    dispatch(openDrawerAction(!open));
  };
  return (
    <>
      <StyledCustomDrawer
        variant="temporary"
        open={open}
        anchor="right"
        onClose={handleToggleDrawer}
      >
        <>
          <IconButton
            sx={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}
            color="inherit"
            onClick={handleToggleDrawer}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
          {/* {content == DrawerContent.login && } */}
          {/* {content == DrawerContent.chat && } */}
          {/* {content == DrawerContent.register && } */}
        </>
      </StyledCustomDrawer>
    </>
  );
};

export default CustomDrawer;