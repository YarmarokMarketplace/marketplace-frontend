import {
  CardActionArea,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
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
import Moment from 'react-moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIcon from '@mui/icons-material/Phone';

interface OwnProductProps {
  children?: React.ReactNode;
  product: ProductItem;
}

const OwnProductItem: React.FC<OwnProductProps> = ({ children, product }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isLgScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <StyledProductContainer>
      <Stack
        direction="row"
        justifyContent={{ md: 'flex-start', lg: 'space-between' }}
        gap={3}
      >
        <CardActionArea
          sx={{ width: 'fit-content' }}
          onClick={() => navigate(`/${product.category}/${product._id}`)}
        >
          <StyledImgWrapper>
            <img src={product.photos[0] ? product.photos[0] : placeholder} />
          </StyledImgWrapper>
        </CardActionArea>
        <Stack width="100%" gap={1}>
          {isSmScreen && (
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="secondary.dark">
                {<Moment format="DD/MM/YY">{product.createdAt}</Moment>}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon color="secondary" sx={{ fontSize: '1rem' }} />
                  <Typography variant="body2" color="secondary.dark">
                    {product.contactsViews}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <VisibilityIcon sx={{ fontSize: '1rem' }} color="secondary" />
                  <Typography variant="body2" color="secondary.dark">
                    {product.views}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          )}
          <StyledLink to={`/${product.category}/${product._id}`}>
            {product.title}
          </StyledLink>
          <Typography variant="body1" color="text.secondary">
            {product.description.length > 53
              ? `${product.description.slice(0, 53)}...`
              : product.description}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            mt={2}
            width="100%"
          >
            <StyledChip
              label={`${product.price} грн`}
              size="small"
              color="primary"
              variant="outlined"
            />
            {isMdScreen && !isSmScreen && (
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneIcon color="secondary" sx={{ fontSize: '1rem' }} />
                  <Typography variant="body2" color="secondary.dark">
                    {product.contactsViews}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <VisibilityIcon sx={{ fontSize: '1rem' }} color="secondary" />
                  <Typography variant="body2" color="secondary.dark">
                    {product.views}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="secondary.dark">
                  {<Moment format="DD/MM/YY">{product.createdAt}</Moment>}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
        {isLgScreen && children}
      </Stack>
      {(isMdScreen || isSmScreen) && children}
    </StyledProductContainer>
  );
};

export default OwnProductItem;
