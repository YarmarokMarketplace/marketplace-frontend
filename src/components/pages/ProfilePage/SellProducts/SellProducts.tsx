import React from 'react';
import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { Typography, Button, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import SellProductItem from '../ProductItem/SellProductItem';
import ProfilePagination from '../ProfilePagination';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { StyledContrastButton } from '../ProductItem/style';

import NoProductMessage from '../NoProductMessage';
import placeholder from '../../../../img/no-fav-product.png';

const product = {
  _id: '650304d8decca38863ee2202',
  category: 'auto',
  goodtype: 'new',
  title: 'scscs sssssssssssssssssss sssssssqwewqewe qwe',
  description: 'wewwe',
  photos: [
    'https://yarmarok-bucket.s3.eu-central-1.amazonaws.com/bTLtz2MLDwai1zvaYdHKB.jpg',
  ],
  location: 'Kyiv',
  price: 1212,
  contactName: 'dsdsd',
  contactNumber: '+38 (765) 654 54 54',
  active: true,
  owner: '64fe1bb562725c8460a940d0',
  createdAt: '2023-09-14T13:04:24.842Z',
  updatedAt: '2023-09-14T13:04:24.842Z',
};

const SellProducts = () => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  return (
    <StyledAdsContainer sx={{ width: '100%' }}>
      <StyledTitleContainer>
        <Typography variant="h4">Продаю</Typography>
      </StyledTitleContainer>
      <Stack gap={3}>
        <SellProductItem showMore={showMore} product={product}>
          <Stack direction="row" gap={3} height="fit-content">
            <Button sx={{ paddingX: 2 }} variant="contained">
              Підтвердити
            </Button>
            <StyledContrastButton variant="outlined">
              Скасувати
            </StyledContrastButton>
            <IconButton onClick={() => setShowMore(!showMore)}>
              {showMore ? (
                <ExpandLess color="primary" fontSize="large" />
              ) : (
                <ExpandMore color="primary" fontSize="large" />
              )}
            </IconButton>
          </Stack>
        </SellProductItem>
        <SellProductItem product={product}>
          <Stack>
            <Typography fontWeight={500} color="error.main" variant="h6">
              Скасовано
            </Typography>
          </Stack>
        </SellProductItem>
        <SellProductItem product={product}>
          <Stack>
            <Typography fontWeight={500} color="success.main" variant="h6">
              Отримано
            </Typography>
          </Stack>
        </SellProductItem>
      </Stack>
      <ProfilePagination page={1} totalPages={1} handlePageChange={() => {}} />
      {/* <NoProductMessage src={placeholder}>
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
        </NoProductMessage> */}
    </StyledAdsContainer>
  );
};

export default SellProducts;
