import {
  CardActionArea,
  Stack,
  Typography,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import React from 'react';
import {
  StyledChip,
  StyledContrastButton,
  StyledImgWrapper,
  StyledInfoContainer,
  StyledLink,
  StyledProductContainer,
} from './style';

import placeholder from '../../../../img/placeholder-image.png';
import { ProductItem } from '../../../../types';
import { useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SellProductProps {
  children?: React.ReactNode;
  product: ProductItem;
}

const SellProductItem: React.FC<SellProductProps> = ({ children, product }) => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = React.useState<boolean>(false);

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
    </StyledProductContainer>
  );
};

export default SellProductItem;
