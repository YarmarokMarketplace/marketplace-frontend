import React from "react";
import { StyledButton } from "./style";
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { userLoginStateSelector } from "../../components/DrawerContent/selector";
import { openDrawerAction, setDrawerContentAction } from "../CustomDrawer/reducer";
import { DrawerContent } from "../../types";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const ChatButton = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector(userLoginStateSelector);

  const handleChatClick = () => {
    if (isLogin) {
      navigate('/chat');
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  }

  return (
    <StyledButton
      onClick={handleChatClick}
      color="primary"
      startIcon={<ChatOutlinedIcon />}
      variant="outlined"
    >
      Чат
    </StyledButton>
  );
};

export default ChatButton;
