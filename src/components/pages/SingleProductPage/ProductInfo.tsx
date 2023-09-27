import React, { useEffect, useState } from 'react';
import { Button, Rating, Stack, Typography } from '@mui/material';
import { StyledIconButton, StyledInfoBlock, StyledShowButton } from './style';
import { StyledTextButton } from '../../Header/style';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { DrawerContent, ProductItem } from '../../../types';
import moment from 'moment';
import {
  categoriesDeliveryAbsense,
  goodTypeNames,
  locations,
} from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginStateSelector } from 'redux/auth/selector';
import { AppDispatch } from '../../../store';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../../CustomDrawer/reducer';
import { profileStateSelector } from '../ProfilePage/selector';
import {
  addFavoriteProductFetch,
  removeFavoriteProductFetch,
} from '../ProfilePage/thunk';

type ProductInfoProps = {
  product: ProductItem;
};

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const location = locations.find(
    (location) => location.value === product.location
  );
  const [showNumber, setShowNumber] = useState(false);
  const { isLogin, user } = useSelector(userLoginStateSelector);
  const { favorites } = useSelector(profileStateSelector);
  const [fav, setFav] = useState<boolean>(
    user.favorite.some((notice) => notice === product._id)
  );

  useEffect(() => {
    if (favorites.length) {
      setFav(favorites.some((notice) => notice === product._id));
    }
  }, [favorites, product._id]);
  const dispatch: AppDispatch = useDispatch();

  const handleBuyClick = () => {
    if (isLogin) {
      // handle buy action
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  };

  const handleChatClick = () => {
    if (isLogin) {
      // handle chat action
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  };

  const handleFavClick = () => {
    if (isLogin) {
      if (fav) {
        dispatch(removeFavoriteProductFetch(product._id));
      } else {
        dispatch(addFavoriteProductFetch(product._id));
      }
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
    }
  };

  return (
    <Stack spacing={2}>
      <StyledInfoBlock>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="success.main" variant="body1">
            {product.goodtype ? goodTypeNames[product.goodtype] : ''}
          </Typography>
          <Typography color="divider" variant="body1">
            {`ID:${product._id.replace(/[^\d]/g, '').slice(9)}`}
          </Typography>
        </Stack>
        <Typography variant="h4" mt={1} minHeight="4rem">
          {product.title}
        </Typography>
        <Typography mt={2} color="primary" variant="h4">
          {product.price} грн
        </Typography>
        <Stack mt={2} direction="row" justifyContent="space-between">
          <Stack spacing={2} direction="row">
            <Button
              id="buy-btn"
              sx={{ width: '7rem' }}
              onClick={handleBuyClick}
              variant="contained"
            >
              Купити
            </Button>
            <Button
              id="chat-btn"
              startIcon={<ChatOutlinedIcon />}
              variant="outlined"
              onClick={handleChatClick}
            >
              Чат з продавцем
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center">
            <StyledIconButton
              onClick={handleFavClick}
              id="fav-btn"
              size="small"
            >
              {fav ? (
                <FavoriteIcon color="primary" sx={{ fontSize: '1rem' }} />
              ) : (
                <FavoriteBorderOutlinedIcon
                  color="primary"
                  sx={{ fontSize: '1rem' }}
                />
              )}
            </StyledIconButton>
            <StyledTextButton onClick={handleFavClick} disableTouchRipple>
              В обране
            </StyledTextButton>
          </Stack>
        </Stack>
        <Typography mt={2} textAlign="center" color="divider" variant="body1">
          {location?.label}, Опубліковано{' '}
          {moment(product.createdAt).format('DD.MM.YYYY')}
        </Typography>
      </StyledInfoBlock>
      <StyledInfoBlock>
        <Stack spacing={2}>
          <Typography fontWeight={700} variant="h6">
            Продавець
          </Typography>
          <Stack borderBottom="1px solid" borderColor="secondary.light" pb={2}>
            <Typography
              fontWeight={500}
              color="primary.main"
              variant="subtitle2"
            >
              {product.contactName}
            </Typography>
            <Typography color="divider" variant="caption">
              {location?.label}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating
              color="info"
              size="medium"
              value={4.5}
              precision={0.5}
              readOnly
            />
            <Typography color="info.main" fontWeight={700} variant="h6">
              4.5
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption">
              2 роки та 4 місяці на yarmarok.ua
            </Typography>
            <Typography color="primary.main" variant="caption">
              •
            </Typography>
            <Typography color="primary.main" variant="caption">
              7 відгуків
            </Typography>
          </Stack>
        </Stack>
      </StyledInfoBlock>
      <StyledInfoBlock>
        <Typography fontWeight={700} variant="h6">
          Контакти
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} mt={1}>
          <LocalPhoneOutlinedIcon color="primary" />
          <Typography variant="h6">
            {showNumber && product.contactNumber
              ? product.contactNumber.slice(3)
              : 'xxx xxx xxxx'}{' '}
          </Typography>
          {!showNumber && (
            <StyledShowButton
              id="show-btn"
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => setShowNumber(!showNumber)}
            >
              Показати
            </StyledShowButton>
          )}
        </Stack>
      </StyledInfoBlock>

      {!categoriesDeliveryAbsense.includes(product.category) && (
        <Stack direction="row" spacing={2}>
          <StyledInfoBlock sx={{ width: '50%' }}>
            <Typography fontWeight={700} variant="h6" mb={1}>
              Способи доставки
            </Typography>
            <Typography variant="body1">Доставка “Нова Пошта”</Typography>
            <Typography variant="body1">Доставка “Укрпошта”</Typography>
          </StyledInfoBlock>
          <StyledInfoBlock sx={{ width: '50%' }}>
            <Stack spacing={1}>
              <Typography fontWeight={700} variant="h6">
                Умови повернення
              </Typography>
              <Typography maxWidth="12rem" variant="body1">
                Протягом 14 днів після отримання товару
              </Typography>
            </Stack>
          </StyledInfoBlock>
        </Stack>
      )}
    </Stack>
  );
};
