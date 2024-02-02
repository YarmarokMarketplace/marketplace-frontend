import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import {
  productFilterGoodtypeAction,
  productFilterPriceAction,
  productFilterLocationAction,
  productFilterRatingAction,
  currentPageSetAction,
} from '../../../redux/products/reducer';

import {
  StyledCard,
  StyledCardContent,
  StyledCategoryLink,
  StyledImage,
  StyledImgWrapper,
  StyledItemWrapper,
} from './style';
import { CardActionArea } from '@mui/material';

import { useNavigate } from 'react-router';

import { CategoryItem } from '../../../types';
import { categoryNames } from '../../../constants';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CategotyItemProp {
  category: CategoryItem;
  color?: string;
  list?: boolean;
}

const CategoryItem: React.FC<CategotyItemProp> = ({
  category,
  list,
  color,
}) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(productFilterGoodtypeAction(''));
    dispatch(productFilterPriceAction(''));
    dispatch(productFilterLocationAction(''));
    dispatch(productFilterRatingAction(''));
    localStorage.removeItem('goodtype');
    localStorage.removeItem('price');
    localStorage.removeItem('location');
    localStorage.removeItem('rating');
    dispatch(currentPageSetAction(1));
    navigate(`/${category.name}`);
  };

  const className: { [key: string]: string } = {
    help: 'help',
    exchange: 'exchange',
    'for-free': 'resize',
    'home-and-garden': 'resize',
    list: 'list',
  };

  return (
    <StyledItemWrapper
      spacing={list ? 0 : 2}
      className={list ? className['list'] : ''}
      sx={{ backgroundColor: color ? color : '' }}
      onClick={list ? handleItemClick : undefined}
    >
      <StyledCard>
        <CardActionArea
          id={`btn-${category._id.slice(20)}`}
          onClick={handleItemClick}
        >
          <StyledCardContent className={list ? className['list'] : ''}>
            <StyledImgWrapper>
              <StyledImage
                id={`category-${category._id.slice(20)}`}
                src={category.photo}
                alt={`${category.name} image`}
                className={className[category.name]}
              />
            </StyledImgWrapper>
          </StyledCardContent>
        </CardActionArea>
      </StyledCard>
      <StyledCategoryLink
        to={`/${category.name}`}
        className={list ? className['list'] : ''}
      >
        {categoryNames[category.name]}
      </StyledCategoryLink>
      {list && <ArrowForwardIosIcon sx={{ margin: '0 8px 0 auto' }} />}
    </StyledItemWrapper>
  );
};

export default CategoryItem;
