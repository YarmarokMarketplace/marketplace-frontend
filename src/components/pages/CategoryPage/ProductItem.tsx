import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router';
import {
  Stack,
  Typography,
  Chip,
  CardActionArea,
  CardActions,
} from '@mui/material';
import {
  StyledCard,
  StyledCardWrapper,
  StyledImgWrapper,
  StyledCardContent,
  TitleTypography,
  StyledImg,
  StyledButton,
} from './style';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Moment from 'react-moment';
import { ProductItem } from '../../../types';
import placeholderImg from '/src/img/placeholder-image.png';
import { useDispatch, useSelector } from 'react-redux';
import { profileStateSelector } from '../../../redux/profile/selector';
import {
  addFavoriteProductFetch,
  removeFavoriteProductFetch,
} from '../../../redux/profile/thunk';
import { AppDispatch } from 'src/store';
import { getUserStateSelector } from 'redux/auth/selector';
import {
  offsetFavSetAction,
  currentFavPageSetAction,
} from 'redux/profile/reducer';

interface ProductItemProp {
  product: ProductItem;
  productList?: ProductItem[];
}

const ProductItem: React.FC<ProductItemProp> = ({ product, productList }) => {
  const [error, setError] = useState(false);

  const favoriteList = useSelector(getUserStateSelector).favorite;

  const {
    favorites,
    fav: { page, itemsPerPage, offset },
  } = useSelector(profileStateSelector);

  const [fav, setFav] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (favoriteList?.length) {
      setFav(favoriteList.some((notice) => notice === product._id));
    }
  }, [favoriteList, product._id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (favorites?.length) {
      setFav(favorites.some((notice) => notice === product._id));
    }
  }, [favorites, product._id]);

  const { _id, photos, title, location, createdAt, price, category } = product;

  const handleItemClick = () => {
    navigate(`/${category}/${product._id}`);
  };

  const handleFavoriteClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (fav) {
      if (productList?.length === 1) {
        dispatch(currentFavPageSetAction(page - 1));
        dispatch(offsetFavSetAction(offset - itemsPerPage));
      }
      dispatch(removeFavoriteProductFetch(_id));
    } else {
      dispatch(addFavoriteProductFetch(_id));
    }
  };

  const handleImageError = () => {
    setError(true);
  };

  return (
    <StyledCard className={product.active ? '' : 'inactive'}>
      <CardActionArea disableRipple onClick={handleItemClick}>
        <StyledCardWrapper>
          <StyledImgWrapper>
            {error ? (
              <StyledImg src={placeholderImg} id={`product-${_id.slice(20)}`} />
            ) : (
              <StyledImg
                src={photos[0] ? photos[0] : placeholderImg}
                id={`product-${_id.slice(20)}`}
                onError={handleImageError}
              />
            )}
          </StyledImgWrapper>

          <StyledCardContent>
            <TitleTypography gutterBottom variant="h5">
              {title.length > 45 ? `${title.slice(0, 45)}...` : title}
            </TitleTypography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: '0.75rem',
                fontWeight: '500',
                pb: '.5rem',
                minHeight: { xs: '42px', sm: '42px', md: 'fit-content' },
              }}
            >
              {location} -{<Moment format="DD/MM/YY">{createdAt}</Moment>}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Chip
                label={`${price} грн`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontSize: '0.875rem', fontWeight: '600' }}
              />
              <CardActions>
                <StyledButton onClick={handleFavoriteClick}>
                  {fav ? (
                    <FavoriteIcon fontSize="small" color="primary" />
                  ) : (
                    <FavoriteBorderOutlinedIcon
                      fontSize="small"
                      color="primary"
                    />
                  )}
                </StyledButton>
              </CardActions>
            </Stack>
          </StyledCardContent>
        </StyledCardWrapper>
      </CardActionArea>
    </StyledCard>
  );
};

export default ProductItem;
