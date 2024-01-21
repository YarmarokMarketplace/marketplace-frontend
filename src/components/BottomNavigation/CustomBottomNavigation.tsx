import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AddIcon from '@mui/icons-material/Add';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import {
  StyledNavigationButton,
  StyledNavigationContainer,
  StyledNavigationTab,
} from './style';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'src/store';
import { userLoginStateSelector } from 'redux/auth/selector';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../CustomDrawer/reducer';
import { resetAddAdvertStateAction } from '../pages/AddProduct/reducer';
import { DrawerContent } from 'src/types';
import { Paper } from '@mui/material';

export const CustomBottomNavigation: React.FC<{ pathname: string }> = ({
  pathname,
}) => {
  const [navigationValue, setNavigationValue] = React.useState(pathname);
  const handleNavigationChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setNavigationValue(newValue);
  };

  const dispatch: AppDispatch = useDispatch();
  const { isLogin } = useSelector(userLoginStateSelector);

  const navigate = useNavigate();

  const handleAddAdvert = () => {
    if (isLogin) {
      navigate('/add-advert', { replace: true });
      dispatch(resetAddAdvertStateAction());
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
      setNavigationValue('main');
    }
  };

  const handleClickProfile = () => {
    if (isLogin) {
      navigate('/profile/settings', { replace: true });
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
      setNavigationValue('main');
    }
  };

  const handleCheckFavourites = () => {
    if (isLogin) {
      navigate('/profile/favourites', { replace: true });
    } else {
      dispatch(openDrawerAction(true));
      dispatch(setDrawerContentAction(DrawerContent.login));
      setNavigationValue('main');
    }
  };
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <StyledNavigationContainer
        showLabels
        value={navigationValue}
        onChange={handleNavigationChange}
      >
        <StyledNavigationTab
          label="Головна"
          value="main"
          icon={
            navigationValue === 'main' ? <HomeIcon /> : <HomeOutlinedIcon />
          }
          onClick={() => navigate('/', { replace: true })}
        />
        <StyledNavigationTab
          label="Каталог"
          value="/all-categories"
          icon={
            navigationValue === '/all-categories' ? (
              <BusinessCenterIcon />
            ) : (
              <BusinessCenterOutlinedIcon />
            )
          }
          onClick={() => navigate('/all-categories', { replace: true })}
        />
        <StyledNavigationTab
          value="add-advert"
          onClick={handleAddAdvert}
          icon={
            <StyledNavigationButton
              className={navigationValue === 'add-advert' ? 'Mui-selected' : ''}
            >
              <AddIcon />
            </StyledNavigationButton>
          }
        />
        <StyledNavigationTab
          label="Обране"
          value="/profile/favourites"
          icon={
            navigationValue === '/profile/favourites' ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          onClick={handleCheckFavourites}
        />
        <StyledNavigationTab
          label="Чат"
          value="chat"
          icon={
            navigationValue === 'chat' ? <ChatIcon /> : <ChatOutlinedIcon />
          }
        />
      </StyledNavigationContainer>
    </Paper>
  );
};
