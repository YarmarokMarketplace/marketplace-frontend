import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Rating,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  StyledBuyButton,
  StyledChatButton,
  StyledIconButton,
  StyledInfoBlock,
  StyledShowButton,
  StyledTextButton,
} from './style';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import { DrawerContent, ModalContent, ProductItem } from '../../../types';
import moment from 'moment';
import {
  categoriesDeliveryAbsense,
  goodTypeNames,
  locations,
} from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthStateSelector } from 'redux/auth/selector';
import { AppDispatch } from '../../../store';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../../CustomDrawer/reducer';
import { profileStateSelector } from 'redux/profile/selector';
import {
  addFavoriteProductFetch,
  removeFavoriteProductFetch,
} from 'redux/profile/thunk';
import {
  openModalAction,
  setModalContentAction,
} from 'src/components/CustomModal/reducer';

type ProductInfoProps = {
  product: ProductItem;
  sellerRating: number;
};

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  sellerRating,
}) => {
  const location = locations.find(
    (location) => location.value === product.location
  );
  const [showNumber, setShowNumber] = useState(false);
  const { isLogin, user } = useSelector(userAuthStateSelector);
  const { favorites } = useSelector(profileStateSelector);
  const [fav, setFav] = useState<boolean>(
    user.favorite.some((notice) => notice === product._id)
  );
  const theme: Theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (favorites.length) {
      setFav(favorites.some((notice) => notice === product._id));
    }
  }, [favorites, product._id]);
  const dispatch: AppDispatch = useDispatch();

  const handleBuyClick = () => {
    if (isLogin) {
      dispatch(openModalAction(true));
      dispatch(setModalContentAction(ModalContent.confirmPurchase));
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
    <Stack
      spacing={2}
      sx={{ display: 'grid', gridTemplateColumns: 'minmax(0px, 1fr)' }}
    >
      <StyledInfoBlock>
        <Stack direction="row" justifyContent={'space-between'}>
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
        <Stack direction="row" justifyContent="space-between">
          <Typography mt={2} color="primary" variant="h4">
            {product.price} грн
          </Typography>
          {product.owner == user.id && (
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
          )}
        </Stack>
        {product.owner !== user.id && (
          <Stack mt={2} direction="row" justifyContent="space-between" gap={2}>
            <Stack gap={2} direction="row">
              <StyledBuyButton
                id="buy-btn"
                onClick={handleBuyClick}
                variant="contained"
              >
                Купити
              </StyledBuyButton>
              {isSmScreen ? (
                <StyledChatButton onClick={handleChatClick}>
                  <ChatOutlinedIcon color="primary" fontSize="small" />
                </StyledChatButton>
              ) : (
                <Button
                  id="chat-btn"
                  startIcon={<ChatOutlinedIcon />}
                  variant="outlined"
                  onClick={handleChatClick}
                  sx={{ fontSize: '1.125rem' }}
                >
                  Чат з продавцем
                </Button>
              )}
            </Stack>
            <Stack direction="row" alignItems="center">
              <StyledIconButton
                onClick={handleFavClick}
                id="fav-btn"
                size="small"
              >
                {fav ? (
                  <FavoriteIcon
                    color="primary"
                    sx={{ fontSize: isSmScreen ? 'small' : '1rem' }}
                  />
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
        )}
        <Typography
          mt={2}
          textAlign="center"
          color="divider"
          variant={isSmScreen ? 'subtitle2' : 'body1'}
        >
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
              value={sellerRating}
              precision={0.5}
              readOnly
            />
            <Typography color="info.main" fontWeight={700} variant="h6">
              {sellerRating}
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
      {product.active && (
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
      )}

      {!categoriesDeliveryAbsense.includes(product.category) && (
        <Stack direction={{ sm: 'row' }} gap={2}>
          <StyledInfoBlock sx={{ width: { sm: '50%' } }}>
            <Typography fontWeight={700} variant="h6" mb={1}>
              Способи доставки
            </Typography>
            <Typography variant="body1">Доставка “Нова Пошта”</Typography>
            <Typography variant="body1">Доставка “Укрпошта”</Typography>
          </StyledInfoBlock>
          <StyledInfoBlock sx={{ width: { sm: '50%' } }}>
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
