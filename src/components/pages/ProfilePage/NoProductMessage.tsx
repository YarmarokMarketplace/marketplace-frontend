import React from 'react';

import { NoAdsContainer } from './style';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface NoProductItemProps {
  children?: React.ReactNode;
  button?: boolean;
  src: string;
}

const NoProductMessage: React.FC<NoProductItemProps> = ({
  children,
  button,
  src,
}) => {
  return (
    <NoAdsContainer>
      <img src={src} alt={src} />
      {children}
      {button && (
        <Button
          component={Link}
          id="add-advert-btn"
          to="/add-advert"
          sx={{ paddingX: 2, marginTop: 4 }}
          variant="contained"
        >
          Створити оголошення
        </Button>
      )}
    </NoAdsContainer>
  );
};

export default NoProductMessage;
