import React, { useEffect, useState } from 'react';
import { AppDispatch } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  openModalAction,
  setModalContentAction,
} from '../../CustomModal/reducer';
import {
  userLoginStateSelector,
  getUserStateSelector,
} from 'redux/auth/selector';
import {
  Box,
  Typography,
  Stack,
  Divider,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  MenuContainer,
  StyledLink,
  StyledButton,
  StyledNotification,
} from './style';
import { Routes, Route } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsTab from './SettingsTab/SettingsTab';
import { ModalContent } from '../../../types';
import ChatButton from 'src/components/ChatButton';
import ViewedProducts from './ViewedProducts/ViewedProducts';
import OwnAdsTab from './OwnAdsTab/OwnAdsTab';
import SellProducts from './SellProducts/SellProducts';
import BuyProducts from './BuyProducts/BuyProducts';
import FavProducts from './FavProducts/FavProducts';

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { isLogin } = useSelector(userLoginStateSelector);
  const { name, email } = useSelector(getUserStateSelector);

  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {};

  const handleClickLogout = () => {
    dispatch(openModalAction(true));
    dispatch(setModalContentAction(ModalContent.logout));
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, []);

  return (
    <Stack direction='row' alignItems='flex-start' gap='1.5rem'>
      {!isSmScreen && (
        <MenuContainer>
          <Box>
            <Typography variant='body1' fontWeight='700'>
              {name}
            </Typography>
            <Typography variant='body2' color='#8D9092'>
              {email}
            </Typography>
          </Box>
          <Divider sx={{ mt: '.5rem', mb: '1.5rem' }} />
          <Stack gap='1rem' mb='3.5rem'>
            <StyledLink id='profile-advert' to='own-ads'>
              Оголошення
            </StyledLink>
            <Stack direction='row' gap={1} alignItems='center'>
              <StyledLink id='profile-sell' to='sell'>
                Продаю
              </StyledLink>
              <StyledNotification color='primary' variant='dot' />
            </Stack>
            <Stack direction='row' gap={1} alignItems='center'>
              <StyledLink id='profile-buy' to='buy'>
                Купую
              </StyledLink>
              <StyledNotification color='primary' variant='dot' />
            </Stack>
            <StyledLink id='profile-selected' to='favourites'>
              Обране
            </StyledLink>
            <StyledLink id='profile-viewed' to='viewed'>
              Переглянуті товари
            </StyledLink>
            <StyledLink id='profile-settings' to='settings'>
              Налаштування
            </StyledLink>
          </Stack>

          <StyledButton
            variant='text'
            endIcon={<LogoutIcon />}
            onClick={handleClickLogout}
          >
            Вийти
          </StyledButton>
        </MenuContainer>
      )}

      <Routes>
        <Route path='settings' element={<SettingsTab />} />
        <Route path='viewed' element={<ViewedProducts />} />
        <Route path='own-ads' element={<OwnAdsTab />} />
        <Route path='sell' element={<SellProducts />} />
        <Route path='buy' element={<BuyProducts />} />
        <Route path='favourites' element={<FavProducts />} />
      </Routes>
    </Stack>
  );
};

export default ProfilePage;
