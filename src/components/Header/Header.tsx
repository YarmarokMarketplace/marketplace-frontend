import React, { useState } from "react";
import { Stack, Container, ButtonGroup, Button, useTheme } from "@mui/material";
import {
  CustomDivider,
  StyledAppBar,
  StyledButton,
  StyledIconButton,
  StyledLink,
  StyledLogo,
  StyledTextButton,
  StyledToolBar,
} from "./style";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

import logo from "../../img/logo.png";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  openDrawerAction,
  setDrawerContentAction,
} from "../CustomDrawer/reducer";
import { DrawerContent } from "../../types";
import { useNavigate } from "react-router";
import { userLoginStateSelector, getUserStateSelector } from "../DrawerContent/selector";

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [lang, setLang] = useState("ua");
  const dispatch: AppDispatch = useDispatch();
  const handleAddAdvert = () => {
    if (isLogin) {
      navigate('/add-advert');
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  };
  const handleLocalization = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    setLang(event.currentTarget.value);
  };
  const handleCheckFavourites = () => { };
  const handleClickAccount = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.login));
  };
  const { isLogin } = useSelector(
    userLoginStateSelector
  );
  const { name } = useSelector(
    getUserStateSelector
  );

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
                  id="fav-btn"
                >
                  <FavoriteIcon sx={{ fontSize: "1rem" }} />
                </StyledIconButton>
                <StyledTextButton
                  disableTouchRipple
                  id="fav-txt-btn"
                  color="inherit"
                  variant="text"
                  size="small"
                >
                  Обране
                </StyledTextButton>
              </Stack>
              {isLogin ?
                (
                  < Stack direction="row" spacing={1} alignItems="center">
                    <StyledIconButton
                      // onClick={ }
                      size="small"
                      color="primary"
                      id="acc-btn"
                    >
                      <PersonIcon sx={{ fontSize: "1rem" }} />
                    </StyledIconButton>
                    <StyledTextButton
                      // onClick={ }
                      disableTouchRipple
                      id="acc-text-btn"
                      color="inherit"
                      variant="text"
                      size="small"
                    >
                      {name}
                    </StyledTextButton>
                  </Stack>
                )
                :
                (< Stack direction="row" spacing={1} alignItems="center">
                  <StyledIconButton
                    onClick={handleClickAccount}
                    size="small"
                    color="primary"
                    id="acc-btn"
                  >
                    <PersonIcon sx={{ fontSize: "1rem" }} />
                  </StyledIconButton>
                  <StyledTextButton
                    onClick={handleClickAccount}
                    disableTouchRipple
                    id="acc-text-btn"
                    color="inherit"
                    variant="text"
                    size="small"
                  >
                    Увійти
                  </StyledTextButton>
                </Stack>
                )}
              <ButtonGroup size="small" sx={{ alignItems: "center", gap: 1 }}>
                <Button
                  value="ua"
                  sx={{
                    fontSize: "1rem",
                    color:
                      lang === "ua"
                        ? theme.palette.text.primary
                        : theme.palette.divider,
                    ":hover": {
                      color: theme.palette.primary.main,
                      backgroundColor: "transparent",
                    },
                  }}
                  variant="text"
                  size="small"
                  disableTouchRipple
                  onClick={handleLocalization}
                >
                  UA
                </Button>
                <CustomDivider />
                <Button
                  value="en"
                  disableTouchRipple
                  sx={{
                    fontSize: "1rem",
                    color:
                      lang === "en"
                        ? theme.palette.text.primary
                        : theme.palette.divider,
                    ":hover": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                    },
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
      </StyledAppBar >
    </>
  );
};

export default Header;
