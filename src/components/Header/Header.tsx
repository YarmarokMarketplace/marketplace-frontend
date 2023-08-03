import React, { useState } from "react";
import {
  Stack,
  Typography,
  Container,
  ButtonGroup,
  Button,
  useTheme,
} from "@mui/material";
import {
  CustomDivider,
  StyledAppBar,
  StyledButton,
  StyledIconButton,
  StyledLink,
  StyledLogo,
  StyledToolBar,
} from "./style";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

import logo from "../../img/logo.png";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import {
  openDrawerAction,
  setDrawerContentAction,
} from "../CustomDrawer/reducer";
import { DrawerContent } from "../../types";

const Header = () => {
  const theme = useTheme();
  const [lang, setLang] = useState("ua");
  const dispatch: AppDispatch = useDispatch();
  const handleAddAdvert = () => {};
  const handleLocalization = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    setLang(event.currentTarget.value);
  };
  const handleCheckFavourites = () => {};
  const handleClickAccount = () => {
    //If user not logged in
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.login));
  };
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
              <ButtonGroup size="small" sx={{ alignItems: "center", gap: 1 }}>
                <Button
                  value="ua"
                  sx={{
                    fontSize: "1rem",
                    color:
                      lang === "ua"
                        ? theme.palette.primary.main
                        : theme.palette.divider,
                  }}
                  variant="text"
                  size="small"
                  onClick={handleLocalization}
                >
                  UA
                </Button>
                <CustomDivider />
                <Button
                  value="en"
                  sx={{
                    fontSize: "1rem",
                    color:
                      lang === "en"
                        ? theme.palette.primary.main
                        : theme.palette.divider,
                  }}
                  variant="text"
                  size="small"
                  onClick={handleLocalization}
                >
                  EN
                </Button>
              </ButtonGroup>
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
