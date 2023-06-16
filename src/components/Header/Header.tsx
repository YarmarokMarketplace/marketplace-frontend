import React from "react";
import { Button, ToggleButtonGroup, Stack, Divider } from "@mui/material";
import {
  StyledAppBar,
  StyledButton,
  StyledLogo,
  StyledToggleButton,
  StyledToolBar,
} from "./style";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import logo from "../../img/logo.png";

const Header = () => {
  const handleAddAdvert = () => {};
  const handleLocalization = () => {};
  const handleCheckFavourites = () => {};
  const handleClickAccount = () => {};
  return (
    <>
      <StyledAppBar position="static">
        <StyledToolBar>
          <StyledLogo src={logo} alt="logo" />

          <Stack direction="row" spacing={3}>
            <ToggleButtonGroup
              value="ua"
              size="small"
              color="primary"
              exclusive
            >
              <StyledToggleButton onClick={handleLocalization} value="ua">
                Укр
              </StyledToggleButton>
              <Divider orientation="vertical" flexItem />
              <StyledToggleButton onClick={handleLocalization} value="en">
                Eng
              </StyledToggleButton>
            </ToggleButtonGroup>
            <Button
              onClick={handleCheckFavourites}
              startIcon={<FavoriteBorderIcon />}
            >
              Обране
            </Button>
            <Button
              onClick={handleClickAccount}
              startIcon={<PersonOutlineIcon />}
            >
              Увійти
            </Button>

            <StyledButton
              onClick={handleAddAdvert}
              size="small"
              variant="contained"
            >
              Додати оголошення
            </StyledButton>
          </Stack>
        </StyledToolBar>
      </StyledAppBar>
    </>
  );
};

export default Header;
