import React from 'react';
import { StyledAdsContainer, StyledTitleContainer } from '../style';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import SellProductItem from '../ProductItem/SellProductItem';
import ProfilePagination from '../ProfilePagination';

const product = {
  _id: '650304d8decca38863ee2202',
  category: 'auto',
  goodtype: 'new',
  title:
    'Садиба фамільнородова Старопортофранківська Садиба фамільнородова Старопортофранківська',
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
  return (
    <StyledAdsContainer sx={{ width: '68.5rem' }}>
      <StyledTitleContainer>
        <Typography variant="h4">Продаю</Typography>
      </StyledTitleContainer>
      <Stack gap={3}>
        <SellProductItem product={product} />
        <SellProductItem product={product} />
      </Stack>
      <ProfilePagination page={1} totalPages={1} handlePageChange={() => {}} />
    </StyledAdsContainer>
  );
};

export default SellProducts;
