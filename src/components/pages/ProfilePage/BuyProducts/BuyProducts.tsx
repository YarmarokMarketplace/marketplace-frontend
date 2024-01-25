import React, { useState, useEffect } from 'react';
import { AppDispatch } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';

import { ordersStateSelector } from 'redux/orders/selector';
import { getBuyOrdersFetch } from 'redux/orders/thunk';
import { currentPageSetAction, setOrderIdAction } from 'redux/orders/reducer';
import {
  openModalAction,
  setModalContentAction,
} from '../../../CustomModal/reducer';
import { ModalContent } from '../../../../types';

import { StyledAdsContainer, StyledTitleContainer } from '../style';
import {
  Typography,
  Button,
  IconButton,
  Tooltip,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import ProfileProductItem from '../ProductItem/ProfileProductItem';
import ProfilePagination from '../ProfilePagination';

import NoProductMessage from '../NoProductMessage';
import placeholder from '../../../../img/no-fav-product.png';
import SkeletonAds from '../SkeletonAds';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';

const BuyProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLgScreen = useMediaQuery(theme.breakpoints.up('md'));

  const {
    loading,
    error,
    orders: { totalPages, page, limit, result },
  } = useSelector(ordersStateSelector);

  useEffect(() => {
    dispatch(getBuyOrdersFetch(page));
  }, [page]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentPageSetAction(page));
  };

  const handleOpenModal = (e: React.SyntheticEvent) => {
    const orderId = e.currentTarget.getAttribute('data-order-id');
    orderId && dispatch(setOrderIdAction(orderId));
    dispatch(openModalAction(true));
    dispatch(setModalContentAction(ModalContent.confirmReceived));
  };

  const orderStatusChange = (
    status: string,
    _id: string,
    date: string,
    i: number
  ) => {
    if (status === 'await-confirm') {
      return (
        <>
          <Typography
            fontWeight={500}
            color="info.main"
            variant="h6"
            sx={{
              whiteSpace: { sm: 'nowrap', md: 'break-spaces' },
            }}
          >
            Очікується підтвердження
          </Typography>
          {isLgScreen && (
            <Typography variant="body1" color="secondary.dark">
              {<Moment format="DD/MM/YYYY">{date}</Moment>}
            </Typography>
          )}
        </>
      );
    } else if (status === 'await-delivery') {
      return (
        <>
          <Typography
            fontWeight={500}
            whiteSpace="break-spaces"
            color="info.main"
            variant="h6"
          >
            Очікується доставка
          </Typography>
          {isLgScreen && (
            <Typography variant="body1" color="secondary.dark">
              {<Moment format="DD/MM/YYYY">{date}</Moment>}
            </Typography>
          )}
        </>
      );
    } else if (status === 'cancelled-by-seller') {
      return (
        <>
          <Typography
            whiteSpace="break-spaces"
            fontWeight={500}
            color="error.main"
            variant="h6"
          >
            Скасовано
          </Typography>
          {isLgScreen && (
            <Typography variant="body1" color="secondary.dark">
              {<Moment format="DD/MM/YYYY">{date}</Moment>}
            </Typography>
          )}
        </>
      );
    } else if (status === 'received') {
      return (
        <>
          <Typography fontWeight={500} color="success.main" variant="h6">
            Отримано
          </Typography>
          {isLgScreen && (
            <Typography variant="body1" color="secondary.dark">
              {<Moment format="DD/MM/YYYY">{date}</Moment>}
            </Typography>
          )}
        </>
      );
    }
  };

  return (
    <StyledAdsContainer>
      <StyledTitleContainer>
        <Typography variant="h4">Купую</Typography>
      </StyledTitleContainer>
      {loading && <SkeletonAds limit={limit} />}
      {!loading && !error && result.length > 0 && (
        <Stack gap={3} width="100%">
          {result.map((order, i) => {
            return (
              <ProfileProductItem
                order={order}
                key={order._id}
                sell
                handleConfirmReceive={handleOpenModal}
                status={order.status}
              >
                <Stack
                  width={{ sm: '100%', md: '30%' }}
                  textAlign="end"
                  justifyContent="flex-start"
                  spacing={2}
                >
                  {orderStatusChange(
                    order.status,
                    order._id,
                    order.createdAt,
                    i
                  )}
                  {isLgScreen && order.status === 'await-delivery' && (
                    <Button
                      data-order-id={order._id}
                      onClick={handleOpenModal}
                      sx={{ paddingX: 2, fontSize: '1rem', marginTop: 2 }}
                      variant="contained"
                    >
                      Я отримав
                    </Button>
                  )}
                  {isLgScreen && order.status === 'received' && (
                    <Button
                      data-order-id={order._id}
                      // onClick={}
                      sx={{
                        paddingX: 2,
                        textWrap: 'nowrap',
                        fontSize: '1rem',
                        marginTop: 2,
                      }}
                      variant="contained"
                    >
                      Залишити відгук
                    </Button>
                  )}
                </Stack>
              </ProfileProductItem>
            );
          })}
        </Stack>
      )}

      {!loading && error && (
        <NoProductMessage src={placeholder}>
          <Typography variant="h4" fontWeight={700} mt={3}>
            Почніть купувати
          </Typography>
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.secondary"
            mt={1}
          >
            Натисніть "Купити" на оголошенні, яке Вас зацікавило і оформіть
            покупку
          </Typography>
        </NoProductMessage>
      )}

      {!loading && !error && result.length > 0 && (
        <ProfilePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      {isSmScreen && <CustomBottomNavigation pathname="/profile/buy" />}
    </StyledAdsContainer>
  );
};

export default BuyProducts;
