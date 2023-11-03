import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store';
import Moment from 'react-moment';

import { ordersStateSelector } from 'redux/orders/selector';
import { getSellOrdersFetch, changeOrderStatusFetch } from 'redux/orders/thunk';
import { currentPageSetAction } from 'redux/orders/reducer';

import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { Typography, Button, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import SellProductItem from '../ProductItem/SellProductItem';
import ProfilePagination from '../ProfilePagination';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { StyledContrastButton } from '../ProductItem/style';
import SkeletonAds from '../SkeletonAds';

import NoProductMessage from '../NoProductMessage';
import placeholder from '../../../../img/no-fav-product.png';

const SellProducts = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    loading,
    error,
    orders: { totalPages, page, limit, result },
  } = useSelector(ordersStateSelector);

  const [cardStates, setCardStates] = React.useState(result.map(() => false));
  const handleToggleCard = (index: number) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
  };

  useEffect(() => {
    dispatch(getSellOrdersFetch(page));
    setCardStates(result.map(() => false));
  }, [page]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentPageSetAction(page));
  };

  const handleChangeStatus = (e: React.SyntheticEvent) => {
    const btnName = (e.currentTarget as HTMLButtonElement).name;
    const _id = e.currentTarget.getAttribute('data-order-id');
    const status: string =
      btnName === 'approve' ? 'await-delivery' : 'cancelled-by-seller';
    _id && dispatch(changeOrderStatusFetch({ status, _id }));
  };

  const orderStatusChange = (status: string, _id: string, i: number) => {
    if (status === 'await-confirm') {
      return (
        <>
          <Button
            data-order-id={_id}
            onClick={handleChangeStatus}
            sx={{ paddingX: 2 }}
            name='approve'
            variant='contained'
          >
            Підтвердити
          </Button>
          <StyledContrastButton
            data-order-id={_id}
            name='cancel'
            onClick={handleChangeStatus}
            variant='outlined'
          >
            Скасувати
          </StyledContrastButton>
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
    } else if (status === 'await-delivery') {
      return (
        <Typography
          fontWeight={500}
          color='info.main'
          variant='h6'
          sx={{ whiteSpace: 'nowrap' }}
        >
          Очікується відправка
        </Typography>
      );
    }
  };

  return (
    <StyledAdsContainer sx={{ width: '100%' }}>
      <StyledTitleContainer>
        <Typography variant='h4'>Продаю</Typography>
      </StyledTitleContainer>
      {loading && <SkeletonAds limit={limit} />}
      {!loading && !error && result.length > 0 && (
        <Stack gap={3}>
          {result.map((order, i) => {
            return (
              <SellProductItem
                order={order}
                key={order._id}
                isExpanded={cardStates[i]}
                onToggle={() => handleToggleCard(i)}
              >
                <Stack alignItems='flex-end' justifyContent='space-between'>
                  <Stack
                    direction='row'
                    gap={3}
                    height='fit-content'
                    alignItems='center'
                  >
                    {orderStatusChange(order.status, order._id, i)}
                    <IconButton onClick={() => handleToggleCard(i)}>
                      {cardStates[i] ? (
                        <ExpandLess color='primary' fontSize='large' />
                      ) : (
                        <ExpandMore color='primary' fontSize='large' />
                      )}
                    </IconButton>
                  </Stack>
                  <Typography variant='body1' color='secondary.dark'>
                    {<Moment format='DD/MM/YYYY'>{order.createdAt}</Moment>}
                  </Typography>
                </Stack>
              </SellProductItem>
            );
          })}
        </Stack>
      )}

      {!loading && result.length === 0 && (
        <NoProductMessage src={placeholder}>
          <Typography variant='h4' fontWeight={700} mt={3}>
            Тут будуть відображатись товари, які хтось у Вас купує.
          </Typography>
          <Typography
            variant='body1'
            fontWeight={500}
            color='text.secondary'
            mt={1}
          >
            Щойно покупець натисне кнопку “Купити” і оформить замовлення, воно
            відобразиться тут.
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

export default SellProducts;
