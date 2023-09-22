import React from 'react';

import image from '../../../../img/no-ads-image.png';
import { NoAdsContainer } from '../style';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface NoProductItemProps {
  children?: React.ReactNode;
}

const NoProductItem: React.FC<NoProductItemProps> = ({ children }) => {
  return (
    <NoAdsContainer>
      <img src={image} alt={image} />
      {children}
      <Button
        component={Link}
        id="add-advert-btn"
        to="/add-advert"
        sx={{ paddingX: 2, marginTop: 4 }}
        variant="contained"
      >
        Створити оголошення
      </Button>
    </NoAdsContainer>
  );
};

export default NoProductItem;
