import { CardActionArea, Stack, Typography } from '@mui/material';
import React from 'react';
import {
  StyledChip,
  StyledImgWrapper,
  StyledLink,
  StyledProductContainer,
} from './style';

import placeholder from '../../../../img/placeholder-image.png';
import { ProductItem } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface OwnProductProps {
  children?: React.ReactNode;
  product: ProductItem;
}

const OwnProductItem: React.FC<OwnProductProps> = ({ children, product }) => {
  const navigate = useNavigate();

  return (
    <StyledProductContainer>
      <Stack direction="row" gap={3}>
        <CardActionArea
          sx={{ width: 'fit-content' }}
          onClick={() => navigate(`/${product.category}/${product._id}`)}
        >
          <StyledImgWrapper>
            <img src={product.photos[0] ? product.photos[0] : placeholder} />
          </StyledImgWrapper>
        </CardActionArea>
        <Stack width="32rem" gap={1}>
          <StyledLink to={`/${product.category}/${product._id}`}>
            {product.title}
          </StyledLink>
          <Typography variant="body1" color="text.secondary">
            {product.description.length > 53
              ? `${product.description.slice(0, 53)}...`
              : product.description}
          </Typography>
          <StyledChip
            label={`${product.price} грн`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>
        {children}
      </Stack>
    </StyledProductContainer>
  );
};

export default OwnProductItem;
