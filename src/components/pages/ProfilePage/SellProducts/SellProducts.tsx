import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store';
import Moment from 'react-moment';

import { ordersStateSelector } from 'redux/orders/selector';
import { getSellOrdersFetch, changeOrderStatusFetch } from 'redux/orders/thunk';
import {
  currentPageSetAction,
  currentSellPageSetAction,
} from 'redux/orders/reducer';

import { StyledAdsContainer, StyledTitleContainer } from '../style';
import {
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Stack } from '@mui/system';
import ProfileProductItem from '../ProductItem/ProfileProductItem';
import ProfilePagination from '../ProfilePagination';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { StyledContrastButton } from '../ProductItem/style';
import SkeletonAds from '../SkeletonAds';

import NoProductMessage from '../NoProductMessage';
import placeholder from '../../../../img/no-fav-product.png';
import { CustomBottomNavigation } from 'src/components/BottomNavigation/CustomBottomNavigation';

const SellProducts = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isLgScreen = useMediaQuery(theme.breakpoints.up('md'));

  const {
    loading,
    error,
    sellOrders: { totalPages, page, limit, result },
  } = useSelector(ordersStateSelector);

  const [cardStates, setCardStates] = React.useState(
    result.sell.map(() => false)
  );
  const handleToggleCard = (index: number) => {
    const newCardStates = [...cardStates];
    newCardStates[index] = !newCardStates[index];
    setCardStates(newCardStates);
  };

  useEffect(() => {
    dispatch(getSellOrdersFetch(page));
    setCardStates(result.sell.map(() => false));
  }, [page]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(currentSellPageSetAction(page));
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
            name="approve"
            variant="contained"
            fullWidth={isMdScreen}
          >
            Підтвердити
          </Button>
          <StyledContrastButton
            data-order-id={_id}
            name="cancel"
            sx={{
              paddingX: 2,
              width: isSmScreen
                ? '70% !important'
                : isMdScreen
                ? '75% !important'
                : 'fit-content',
            }}
            onClick={handleChangeStatus}
            variant="outlined"
          >
            Скасувати
          </StyledContrastButton>
        </>
      );
    } else if (status === 'cancelled-by-seller') {
      return (
        <Typography fontWeight={500} color="error.main" variant="h6">
          Скасовано
        </Typography>
      );
    } else if (status === 'received') {
      return (
        <Typography fontWeight={500} color="success.main" variant="h6">
          Отримано
        </Typography>
      );
    } else if (status === 'await-delivery') {
      return (
        <Typography
          fontWeight={500}
          color="info.main"
          variant="h6"
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
        <Typography variant="h4">Продаю</Typography>
      </StyledTitleContainer>
      {loading && <SkeletonAds limit={limit} />}
      {!loading && !error && result.sell.length > 0 && (
        <Stack gap={3}>
          {result.sell.map((order, i) => {
            return (
              <ProfileProductItem
                order={order}
                key={order._id}
                isExpanded={cardStates[i]}
                onToggle={() => handleToggleCard(i)}
                status={order.status}
              >
                <Stack
                  alignItems="flex-end"
                  justifyContent="space-between"
                  marginTop={{
                    xs:
                      order.status === 'await-delivery' ||
                      order.status === 'received'
                        ? 0
                        : 2,
                    md: 0,
                  }}
                  marginLeft={'auto'}
                >
                  <Stack
                    direction="row"
                    gap={{ xs: 2, md: 3 }}
                    height="fit-content"
                    alignItems={
                      'center'
                      // order.status === 'await-delivery' ? 'center' : 'flex-end'
                    }
                    flexWrap="wrap"
                    justifyContent={{
                      xs:
                        order.status === 'await-delivery'
                          ? 'flex-end'
                          : 'space-between',
                      md: 'flex-end',
                    }}
                    width={{ xs: '100%', md: '120%' }}
                  >
                    {orderStatusChange(order.status, order._id, i)}

                    <IconButton onClick={() => handleToggleCard(i)}>
                      {cardStates[i] ? (
                        <ExpandLess color="primary" fontSize="large" />
                      ) : (
                        <ExpandMore color="primary" fontSize="large" />
                      )}
                    </IconButton>
                  </Stack>
                  {isLgScreen && (
                    <Typography variant="body1" color="secondary.dark">
                      {<Moment format="DD/MM/YYYY">{order.createdAt}</Moment>}
                    </Typography>
                  )}
                </Stack>
              </ProfileProductItem>
            );
          })}
        </Stack>
      )}

      {!loading && !result.sell.length && (
        <NoProductMessage src={placeholder}>
          <Typography variant="h4" fontWeight={700} mt={3}>
            Тут будуть відображатись товари, які хтось у Вас купує.
          </Typography>
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.secondary"
            mt={1}
          >
            Щойно покупець натисне кнопку “Купити” і оформить замовлення, воно
            відобразиться тут.
          </Typography>
        </NoProductMessage>
      )}

      {!loading && !error && result.sell.length > 0 && (
        <ProfilePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
      {isSmScreen && <CustomBottomNavigation pathname="/profile/sell" />}
    </StyledAdsContainer>
  );
};

export default SellProducts;
