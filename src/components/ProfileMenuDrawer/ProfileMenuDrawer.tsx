import React, { useEffect } from 'react';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { openModalAction, setModalContentAction } from '../CustomModal/reducer';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../CustomDrawer/reducer';
import { DrawerContent } from '../../types';
import {
  userLoginStateSelector,
  getUserStateSelector,
} from 'redux/auth/selector';
import { ModalContent } from '../../types';

import {
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  StyledCustomDrawer,
  StyledNavigateButton,
  StyledImgWrapper,
  StyledImage,
} from './style';
import { StyledSubmitBtn } from '../DrawerContent/style';
import { StyledButton } from '../pages/ProfilePage/style';
import avatar from '../../img/avatar.png';

import CloseIcon from '@mui/icons-material/Close';
import { profileDrawerSelector } from './selector';
import { openProfileDrawerAction } from './reducer';

const ProfileMenuDrawer = () => {
  const { isLogin } = useSelector(userLoginStateSelector);
  const { name, email, avatarURL } = useSelector(getUserStateSelector);
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { open } = useSelector(profileDrawerSelector);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleDrawer = () => {
    dispatch(openProfileDrawerAction(!open));
  };

  const handleClickLogout = () => {
    dispatch(openModalAction(true));
    dispatch(setModalContentAction(ModalContent.logout));
    dispatch(openProfileDrawerAction(!open));
  };

  const handleLoginBtn = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.login));
    dispatch(openProfileDrawerAction(!open));
  };

  const handleItemClick = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const link = target.getAttribute('data-navigate-link');
    if (isLogin) {
      link && navigate(link);
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
    dispatch(openProfileDrawerAction(false));
  };

  return (
    <>
      <StyledCustomDrawer
        variant='temporary'
        open={open}
        anchor='right'
        onClose={handleToggleDrawer}
      >
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              height: '32px',
              width: '32px',
            }}
            color='inherit'
            onClick={handleToggleDrawer}
          >
            <CloseIcon fontSize='medium' />
          </IconButton>
          <Typography variant='h4' color='initial' mb={3}>
            Кабінет
          </Typography>

          {isLogin ? (
            <Stack direction='row' spacing={2}>
              <StyledImgWrapper>
                <StyledImage
                  id='avatar'
                  src={avatarURL}
                  alt='avatar'
                  sx={{
                    border: `3px solid ${theme.palette.primary.main}`,
                    padding: '.1rem',
                  }}
                />
              </StyledImgWrapper>
              <Stack spacing={1} width='100%'>
                <Typography variant='body1' fontWeight='700'>
                  {name}
                </Typography>
                <Typography variant='body2' color='#8D9092'>
                  {email}
                </Typography>
                <Divider />
              </Stack>
            </Stack>
          ) : (
            <Stack>
              <Stack direction='row' spacing={2}>
                <StyledImgWrapper>
                  <StyledImage id='avatar' src={avatar} alt='avatar' />
                </StyledImgWrapper>
                <Stack spacing={1} width='100%'>
                  <Typography variant='body1' fontWeight='700'>
                    Увійдіть у кабінет
                  </Typography>
                  <Typography variant='body2' color='#8D9092'>
                    Щоб зберігати товари, та відстежувати замовлення
                  </Typography>
                  <Divider />
                </Stack>
              </Stack>
              <StyledSubmitBtn
                onClick={handleLoginBtn}
                id='login-btn'
                color='primary'
                variant='contained'
                type='submit'
                sx={{
                  mt: '1rem',
                  width: '100% !important',
                }}
              >
                Увійти
              </StyledSubmitBtn>
            </Stack>
          )}

          <Stack
            direction='column'
            spacing={2}
            mt={3}
            mb={7}
            onClick={handleItemClick}
          >
            <StyledNavigateButton
              id='mobile-advert'
              data-navigate-link='/profile/own-ads'
            >
              Оголошення
            </StyledNavigateButton>
            <StyledNavigateButton
              id='mobile-sell'
              data-navigate-link='/profile/sell'
            >
              Продаю
            </StyledNavigateButton>
            <StyledNavigateButton
              id='mobile-buy'
              data-navigate-link='/profile/buy'
            >
              Купую
            </StyledNavigateButton>
            <StyledNavigateButton
              id='mobile-selected'
              data-navigate-link='/profile/favourites'
            >
              Обране
            </StyledNavigateButton>
            <StyledNavigateButton
              id='mobile-viewed'
              data-navigate-link='/profile/viewed'
            >
              Переглянуті товари
            </StyledNavigateButton>
            <StyledNavigateButton
              id='mobile-settings'
              data-navigate-link='/profile/settings'
            >
              Налаштування
            </StyledNavigateButton>
          </Stack>

          {isLogin && (
            <StyledButton
              variant='text'
              endIcon={<LogoutIcon />}
              onClick={handleClickLogout}
              sx={{
                justifyContent: 'flex-start',
                marginLeft: '0rem',
              }}
            >
              Вийти
            </StyledButton>
          )}
        </>
      </StyledCustomDrawer>
    </>
  );
};

export default ProfileMenuDrawer;
