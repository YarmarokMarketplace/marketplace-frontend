import React, { useState } from 'react';
import { Stack, Container, ButtonGroup, Button, useTheme } from '@mui/material';
import {
  CustomDivider,
  StyledAppBar,
  StyledButton,
  StyledIconButton,
  StyledLink,
  StyledLogo,
  StyledTextButton,
  StyledToolBar,
} from './style';

import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import logo from '../../img/logo.png';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../CustomDrawer/reducer';
import { DrawerContent } from '../../types';
import { useNavigate } from 'react-router';
import {
  userLoginStateSelector,
  getUserStateSelector,
} from 'redux/auth/selector';
import { matchPath, useLocation } from 'react-router-dom';
import { resetAddAdvertStateAction } from '../pages/AddProduct/reducer';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [lang, setLang] = useState('ua');
  const dispatch: AppDispatch = useDispatch();
  const { isLogin } = useSelector(userLoginStateSelector);
  const { name } = useSelector(getUserStateSelector);

  const handleAddAdvert = () => {
    if (isLogin) {
      navigate('/add-advert');
      dispatch(resetAddAdvertStateAction());
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  };
  const { pathname } = useLocation();
  const handleLocalization = (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    setLang(event.currentTarget.value);
  };
  const handleCheckFavourites = () => {
    if (isLogin) {
      // navigate('/favourites');
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  };
  const handleClickAccount = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.login));
  };

  const handleClickProfile = () => {
    navigate('/profile');
  };

  const handlePathMatch = () => {
    return (
      matchPath('/add-advert', pathname) ||
      (!matchPath('/:categoryName', pathname) && !matchPath('/', pathname))
    );
  };
  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl" disableGutters>
          <StyledToolBar disableGutters>
            <Stack direction="row" alignItems="center" spacing={4} width="30%">
              <StyledLink to="/">
                <StyledLogo src={logo} alt="logo" />
              </StyledLink>
              {handlePathMatch() && (
                <Button
                  id="catalog-btn"
                  endIcon={<ExpandMoreIcon />}
                  variant="outlined"
                >
                  Каталог
                </Button>
              )}
            </Stack>

            <Stack direction="row" spacing={7}>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyledIconButton
                  onClick={handleCheckFavourites}
                  size="small"
                  color="primary"
                  id="fav-btn"
                >
                  <FavoriteIcon sx={{ fontSize: '1rem' }} />
                </StyledIconButton>
                <StyledTextButton
                  onClick={handleCheckFavourites}
                  disableTouchRipple
                  id="fav-txt-btn"
                  color="inherit"
                  variant="text"
                  size="small"
                >
                  Обране
                </StyledTextButton>
              </Stack>
              {isLogin ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <StyledIconButton
                    onClick={handleClickProfile}
                    size="small"
                    color="primary"
                    id="acc-btn"
                  >
                    <PersonIcon sx={{ fontSize: '1rem' }} />
                  </StyledIconButton>
                  <StyledTextButton
                    onClick={handleClickProfile}
                    disableTouchRipple
                    id="acc-text-btn"
                    color="inherit"
                    variant="text"
                    size="small"
                  >
                    {name}
                  </StyledTextButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                  <StyledIconButton
                    onClick={handleClickAccount}
                    size="small"
                    color="primary"
                    id="acc-btn"
                  >
                    <PersonIcon sx={{ fontSize: '1rem' }} />
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
              <ButtonGroup size="small" sx={{ alignItems: 'center', gap: 1 }}>
                <Button
                  value="ua"
                  sx={{
                    fontSize: '1rem',
                    color:
                      lang === 'ua'
                        ? theme.palette.text.primary
                        : theme.palette.divider,
                    ':hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: 'transparent',
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
                    fontSize: '1rem',
                    color:
                      lang === 'en'
                        ? theme.palette.text.primary
                        : theme.palette.divider,
                    ':hover': {
                      backgroundColor: 'transparent',
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
                variant="contained"
                id="add-advert-btn"
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
