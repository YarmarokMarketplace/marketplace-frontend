import React from 'react';
import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { Typography, Button, IconButton, Tooltip, Box } from '@mui/material';
import { Stack } from '@mui/system';
import SellProductItem from '../ProductItem/SellProductItem';
import ProfilePagination from '../ProfilePagination';
import { StyledContrastButton } from '../ProductItem/style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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

const BuyProducts = () => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  const infoText = `Натисніть “Я отримав” у випадку коли ви отримали замовлення. Натисніть “Я не отримав” у випадку коли ви не отримали замовлення та продавець не виходить на звʼязок.`;

  return (
    <StyledAdsContainer sx={{ width: '100%' }}>
      <StyledTitleContainer>
        <Typography variant="h4">Купую</Typography>
      </StyledTitleContainer>
      <Stack gap={3}>
        <SellProductItem product={product} sell>
          <Stack width="30%" textAlign="end">
            <Typography fontWeight={500} color="error.main" variant="h6">
              Скасовано
            </Typography>
          </Stack>
        </SellProductItem>
        <SellProductItem product={product} sell>
          <Stack width="30%" textAlign="end">
            <Typography fontWeight={500} color="success.main" variant="h6">
              Відправлено
            </Typography>
          </Stack>
        </SellProductItem>
        <SellProductItem product={product} sell>
          <Stack width="30%" textAlign="end" gap={3}>
            <Typography fontWeight={500} color="info.main" variant="h6">
              Очікується доставка
            </Typography>
            <Button sx={{ paddingX: 2 }} variant="contained">
              Я отримав
            </Button>
          </Stack>
        </SellProductItem>
      </Stack>
      <ProfilePagination page={1} totalPages={1} handlePageChange={() => {}} />
      {/* <NoProductMessage src={placeholder}>
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
      </NoProductMessage> */}
    </StyledAdsContainer>
  );
};

export default BuyProducts;
