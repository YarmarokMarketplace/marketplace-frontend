import React from "react";
import { ToggleButtonGroup, Stack, Typography, Container } from "@mui/material";
import {
  CustomDivider,
  StyledAppBar,
  StyledButton,
  StyledIconButton,
  StyledLink,
  StyledLogo,
  StyledToggleButton,
  StyledToolBar,
} from "./style";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

import logo from "../../img/logo.png";

const Header = () => {
  const handleAddAdvert = () => {};
  const handleLocalization = () => {};
  const handleCheckFavourites = () => {};
  const handleClickAccount = () => {};
  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl" disableGutters>
          <StyledToolBar disableGutters>
            <StyledLink to="/">
              <StyledLogo src={logo} alt="logo" />
            </StyledLink>

            <Stack direction="row" spacing={7}>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyledIconButton
                  onClick={handleCheckFavourites}
                  size="small"
                  color="primary"
                >
                  <FavoriteIcon sx={{ fontSize: "1rem" }} />
                </StyledIconButton>
                <Typography variant="body1">Обране</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyledIconButton
                  onClick={handleClickAccount}
                  size="small"
                  color="primary"
                >
                  <PersonIcon sx={{ fontSize: "1rem" }} />
                </StyledIconButton>
                <Typography variant="body1">Увійти</Typography>
              </Stack>

              <ToggleButtonGroup
                value="ua"
                size="small"
                color="primary"
                exclusive
                sx={{ alignItems: "center" }}
              >
                <StyledToggleButton onClick={handleLocalization} value="ua">
                  UA
                </StyledToggleButton>
                <CustomDivider />
                <StyledToggleButton onClick={handleLocalization} value="en">
                  ENG
                </StyledToggleButton>
              </ToggleButtonGroup>
              <StyledButton
                onClick={handleAddAdvert}
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
              >
                Додати оголошення
              </StyledButton>
            </Stack>
          </StyledToolBar>
        </Container>
      </StyledAppBar>
    </>
  );
};

export default Header;
