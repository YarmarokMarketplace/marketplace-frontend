import {
  CardActionArea,
  Stack,
  Typography,
  Collapse,
  Rating,
} from '@mui/material';
import React from 'react';
import {
  StyledChip,
  StyledImgWrapper,
  StyledInfoContainer,
  StyledLink,
  StyledProductContainer,
} from './style';

import placeholder from '../../../../img/placeholder-image.png';
import { ProductItem } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { locations } from 'src/constants';

interface SellProductProps {
  children?: React.ReactNode;
  product: ProductItem;
  showMore?: boolean;
  sell?: boolean;
}

const SellProductItem: React.FC<SellProductProps> = ({
  children,
  product,
  showMore,
  sell,
}) => {
  const navigate = useNavigate();

  const location = locations.find(
    (location) => location.value === product.location
  );

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
        <Stack width="100%" gap={1}>
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
      <Collapse in={showMore} timeout={'auto'}>
        <StyledInfoContainer>
          <Typography variant="body1" fontWeight={500} mt={1}>
            Отримувач
          </Typography>
          <Stack width="100%" direction="row" gap={2}>
            <Stack width="30%" gap={1}>
              <Typography variant="body1" color="text.secondary">
                Прізвище та імʼя
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Населений пункт
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Номер поштового відділення
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Поштовий індекс
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Номер телефону
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="body1" color="text.secondary">
                Покутна Олена
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Київ
              </Typography>
              <Typography variant="body1" color="text.secondary">
                2
              </Typography>
              <Typography variant="body1" color="text.secondary">
                02121
              </Typography>
              <Typography variant="body1" color="text.secondary">
                0930647516
              </Typography>
            </Stack>
          </Stack>
        </StyledInfoContainer>
      </Collapse>
      {sell && (
        <StyledInfoContainer sx={{ flexDirection: 'row' }}>
          <Stack width="15%" gap={2} mt={2}>
            <Typography width="100%" fontWeight={700} variant="h6">
              Продавець
            </Typography>
            <Stack>
              <Typography
                fontWeight={500}
                color="primary.main"
                variant="subtitle2"
              >
                {product.contactName}
              </Typography>
              <Typography color="divider" variant="caption">
                {location?.label}
              </Typography>
            </Stack>
          </Stack>
          <Stack mt={2} gap={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating
                color="info"
                size="medium"
                value={4.5}
                precision={0.5}
                readOnly
              />
              <Typography color="info.main" fontWeight={700} variant="h6">
                4.5
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography variant="caption">
                2 роки та 4 місяці на yarmarok.ua
              </Typography>
              <Typography color="primary.main" variant="caption">
                {`• `}
                <Typography color="primary.main" variant="caption">
                  7 відгуків
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
