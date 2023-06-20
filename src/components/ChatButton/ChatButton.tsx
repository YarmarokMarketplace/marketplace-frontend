import React from "react";
import { StyledButton } from "./style";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";

const ChatButton = () => {
  return (
    <StyledButton
      color="primary"
      startIcon={<ChatOutlinedIcon />}
      variant="contained"
    >
      Чат
    </StyledButton>
  );
};

export default ChatButton;
