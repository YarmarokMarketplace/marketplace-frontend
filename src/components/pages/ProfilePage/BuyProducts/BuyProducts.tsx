import React, { useState, useEffect } from 'react';
import { AppDispatch } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';

import { ordersStateSelector } from 'redux/orders/selector';
import { getBuyOrdersFetch } from 'redux/orders/thunk';
import { currentPageSetAction, setOrderIdAction } from 'redux/orders/reducer';
import {
  openModalAction,
  setModalContentAction,
} from '../../../CustomModal/reducer';
import { BuyOrder, ModalContent } from '../../../../types';

import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { Typography, Button, IconButton, Tooltip, Box } from '@mui/material';
import { Stack } from '@mui/system';
import SellProductItem from '../ProductItem/SellProductItem';
import ProfilePagination from '../ProfilePagination';
import { StyledContrastButton } from '../ProductItem/style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import NoProductMessage from '../NoProductMessage';
import placeholder from '../../../../img/no-fav-product.png';

const BuyProducts = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    loading,
    error,
    orders: { totalPages, page, limit, result },
  } = useSelector(ordersStateSelector);

  console.log(totalPages);

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

  const orderStatusChange = (status: string, _id: string, i: number) => {
    if (status === 'await-confirm') {
      return (
        <Typography fontWeight={500} color='info.main' variant='h6'>
          Очікується підтвердження
        </Typography>
      );
    } else if (status === 'await-delivery') {
      return (
        <>
          <Typography fontWeight={500} color='info.main' variant='h6'>
            Очікується доставка
          </Typography>
          <Button
            data-order-id={_id}
            onClick={handleOpenModal}
            sx={{ paddingX: 2 }}
            variant='contained'
          >
            Я отримав
          </Button>
        </>
      );
    } else if (status === 'cancelled-by-seller') {
      return (
        <Typography fontWeight={500} color='error.main' variant='h6'>
          Скасовано
        </Typography>
      );
    } else if (status === 'received') {
      return (
        <Typography fontWeight={500} color='success.main' variant='h6'>
          Отримано
        </Typography>
      );
    }
  };

  const infoText = `Натисніть “Я отримав” у випадку коли ви отримали замовлення. Натисніть “Я не отримав” у випадку коли ви не отримали замовлення та продавець не виходить на звʼязок.`;

  return (
    <StyledAdsContainer sx={{ width: '100%' }}>
      <StyledTitleContainer>
        <Typography variant='h4'>Купую</Typography>
      </StyledTitleContainer>
      {!loading && !error && result.length > 0 && (
        <Stack gap={3}>
          {result.map((order, i) => {
            return (
              <SellProductItem order={order} key={order._id} sell>
                <Stack width='30%' textAlign='end' gap={3}>
                  {orderStatusChange(order.status, order._id, i)}
                </Stack>
              </SellProductItem>
            );
          })}
        </Stack>
      )}

      {!loading && result.length === 0 && (
        <NoProductMessage src={placeholder}>
          <Typography variant='h4' fontWeight={700} mt={3}>
            Почніть купувати
          </Typography>
          <Typography
            variant='body1'
            fontWeight={500}
            color='text.secondary'
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
    </StyledAdsContainer>
  );
};

export default BuyProducts;
