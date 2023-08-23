import React from "react";
import { StyledButton } from "./style";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import {
  openModalAction,
  setModalContentAction,
} from "../CustomModal/reducer";

const ChatButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const handleClickModal = () => {
    //If user not logged in
    dispatch(openModalAction(true));
  };
  return (
    <StyledButton
      onClick={handleClickModal}
      color="primary"
      startIcon={<ChatOutlinedIcon />}
      variant="outlined"
    >
      Чат
    </StyledButton>
  );
};

export default ChatButton;
