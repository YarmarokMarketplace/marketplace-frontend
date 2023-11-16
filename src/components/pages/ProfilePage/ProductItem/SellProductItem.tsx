import React from 'react';
import moment from 'moment';
// import 'moment-duration-format';

import {
  CardActionArea,
  Stack,
  Typography,
  Collapse,
  Rating,
} from '@mui/material';
import {
  StyledChip,
  StyledImgWrapper,
  StyledInfoContainer,
  StyledLink,
  StyledProductContainer,
} from './style';

import placeholder from '../../../../img/placeholder-image.png';
import { ProductItem, Order } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { locations } from 'src/constants';

interface SellProductProps {
  children?: React.ReactNode;
  order: Order;
  isExpanded?: boolean;
  sell?: boolean;
  onToggle?: () => void;
}

const SellProductItem: React.FC<SellProductProps> = ({
  children,
  order,
  isExpanded,
  sell,
}) => {
  const navigate = useNavigate();
  const { product } = order;
  // const location = locations.find(
  //   (location) => location.value === product.location
  // );

  const DateComponent = (createdAt: string) => {
    const currentDate = moment();
    const startDate = moment(createdAt);
    const duration = moment.duration(currentDate.diff(startDate));

    // const years = Math.floor(duration.asYears());
    // const months = Math.floor(duration.asMonths() % 12);

    // const formattedDuration = (duration as any).format('y [роки] M [місяці]', {
    //   trim: 'both',
    // });

    // return <div>{formattedDuration}</div>;
    const years = duration.years();
    const months = duration.months();
    console.log(duration);

    const formattedYears =
      years === 1
        ? `${years} рік`
        : years >= 2 && years <= 4
        ? `${years} роки`
        : `${years} років`;

    const formattedMonths =
      months === 1
        ? `${months} місяць`
        : months >= 2 && months <= 4
        ? `${months} місяці`
        : `${months} місяців`;
    console.log(years);
    const formattedDuration =
      years !== 0
        ? `${formattedYears} ${formattedMonths}`
        : `${formattedMonths}`;

    return <div>{formattedDuration}</div>;
  };

  return (
    <StyledProductContainer>
      <Stack direction='row' gap={3}>
        <CardActionArea
          sx={{ width: 'fit-content' }}
          onClick={() => navigate(`/${product.category}/${product._id}`)}
        >
          <StyledImgWrapper>
            <img src={product.photos?.[0] ? product.photos[0] : placeholder} />
          </StyledImgWrapper>
        </CardActionArea>
        <Stack width='100%' gap={1}>
          <StyledLink to={`/${product.category}/${product._id}`}>
            {product.title}
          </StyledLink>
          <Typography variant='body1' color='text.secondary'>
            {product.description?.length > 53
              ? `${product.description.slice(0, 53)}...`
              : product.description}
          </Typography>
          <StyledChip
            label={`${product.price} грн`}
            size='small'
            color='primary'
            variant='outlined'
          />
        </Stack>
        {children}
      </Stack>
      <Collapse in={isExpanded} timeout={'auto'}>
        <StyledInfoContainer>
          <Typography variant='body1' fontWeight={500} mt={1}>
            Отримувач
          </Typography>
          <Stack width='100%' direction='row' gap={2}>
            <Stack width='30%' gap={1}>
              {!order.deliveryData?.otherSchema?.typeOfOtherDelivery && (
                <Typography variant='body1' color='text.secondary'>
                  Тип доставки
                </Typography>
              )}
              <Typography variant='body1' color='text.secondary'>
                Прізвище та імʼя
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                Номер телефону
              </Typography>

              {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                ?.postOfficeSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    Населений пункт
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    Номер поштового відділення
                  </Typography>
                </>
              )}
              {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                ?.addressSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    Населений пункт
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    Вулиця, номер будинку, квартира
                  </Typography>
                </>
              )}
              {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                ?.postBoxSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    Населений пункт
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    Номер поштомату
                  </Typography>
                </>
              )}
              {order.deliveryData?.ukrPostSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    Населений пункт
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    Вулиця, будинок, квартира
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    Поштовий індекс
                  </Typography>
                </>
              )}
              {order.deliveryData?.otherSchema?.typeOfOtherDelivery && (
                <Typography variant='body1' color='text.secondary'>
                  Бажаний варіант доставки
                </Typography>
              )}
              {order.comments && (
                <Typography variant='body1' color='text.secondary'>
                  Коментарі
                </Typography>
              )}
            </Stack>

            <Stack gap={1}>
              <Typography variant='body1' color='primary.main'>
                {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                  ?.postOfficeSchema && 'Нова Пошта відділення'}
                {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                  ?.addressSchema && 'Нова Пошта адреса'}
                {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                  ?.postBoxSchema && 'Нова Пошта поштомат'}
                {order.deliveryData?.ukrPostSchema && 'Укр Пошта відділення'}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                {order.buyerName} {order.buyerLastname}
              </Typography>
              <Typography variant='body1' color='text.secondary'>
                {order.buyerPhone}
              </Typography>

              {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                ?.postOfficeSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    {
                      order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                        ?.postOfficeSchema?.city
                    }
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {
                      order.deliveryData.newPostSchema?.typeOfNovaPostDelivery
                        ?.postOfficeSchema?.postOfficeNumber
                    }
                  </Typography>
                </>
              )}
              {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                ?.addressSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    {product.location}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {`${order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery?.addressSchema?.street} 
                  ${order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery?.addressSchema?.house} 
                  ${order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery?.addressSchema?.apartments}`}
                  </Typography>
                </>
              )}
              {order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                ?.postBoxSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    {
                      order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                        ?.postBoxSchema?.city
                    }
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {
                      order.deliveryData?.newPostSchema?.typeOfNovaPostDelivery
                        ?.postBoxSchema?.postBoxNumber
                    }
                  </Typography>
                </>
              )}
              {order.deliveryData?.ukrPostSchema && (
                <>
                  <Typography variant='body1' color='text.secondary'>
                    {order.deliveryData?.ukrPostSchema.city}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {`${order.deliveryData?.ukrPostSchema.street} 
                  ${order.deliveryData?.ukrPostSchema.house} 
                  ${order.deliveryData?.ukrPostSchema.apartments}`}
                  </Typography>
                  <Typography variant='body1' color='text.secondary'>
                    {order.deliveryData?.ukrPostSchema.index}
                  </Typography>
                </>
              )}
              {order.deliveryData?.otherSchema?.typeOfOtherDelivery && (
                <Typography variant='body1' color='text.secondary'>
                  {order.deliveryData.otherSchema?.typeOfOtherDelivery}
                </Typography>
              )}
              {order.comments && (
                <Typography variant='body1' color='text.secondary'>
                  {order.comments}
                </Typography>
              )}
            </Stack>
          </Stack>
        </StyledInfoContainer>
      </Collapse>

      {sell && (
        <StyledInfoContainer sx={{ flexDirection: 'row' }}>
          <Stack width='15%' gap={2} mt={2}>
            <Typography width='100%' fontWeight={700} variant='h6'>
              Продавець
            </Typography>
            <Stack>
              <Typography
                fontWeight={500}
                color='primary.main'
                variant='subtitle2'
              >
                {product.contactName}
              </Typography>
              <Typography color='divider' variant='caption'>
                {product.location}
              </Typography>
            </Stack>
          </Stack>
          <Stack mt={2} gap={2}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Rating
                color='info'
                size='medium'
                value={product.owner.rating}
                precision={0.5}
                readOnly
              />
              <Typography color='info.main' fontWeight={700} variant='h6'>
                {product.owner.rating}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant='caption'>
                {DateComponent(product.owner.createdAt)} на yarmarok.ua
              </Typography>
              <Typography color='primary.main' variant='caption'>
                {`• `}
                <Typography color='primary.main' variant='caption'>
                  {product.reviews.length} відгуків
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </StyledInfoContainer>
      )}
    </StyledProductContainer>
  );
};

export default SellProductItem;
