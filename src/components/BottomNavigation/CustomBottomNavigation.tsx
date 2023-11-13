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
import {
  StyledNavigationButton,
  StyledNavigationContainer,
  StyledNavigationTab,
} from './style';
import { Link } from 'react-router-dom';

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

  return (
    <StyledNavigationContainer
      showLabels
      value={navigationValue}
      onChange={handleNavigationChange}
    >
      <StyledNavigationTab
        label="Головна"
        value="main"
        icon={navigationValue === 'main' ? <HomeIcon /> : <HomeOutlinedIcon />}
        component={Link}
        to="/"
      />
      <StyledNavigationTab
        label="Обране"
        value="favorite"
        icon={
          navigationValue === 'favorite' ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )
        }
        component={Link}
        to="profile/favourites"
      />
      <StyledNavigationTab
        value="add-advert"
        icon={
          <StyledNavigationButton
            className={navigationValue === 'add-advert' ? 'Mui-selected' : ''}
            component={Link}
            disabled={navigationValue === 'add-advert'}
            to="/add-advert"
          >
            <AddIcon />
          </StyledNavigationButton>
        }
      />
      <StyledNavigationTab
        label="Профіль"
        value="profile"
        icon={
          navigationValue === 'profile' ? (
            <PersonIcon />
          ) : (
            <PersonOutlineOutlinedIcon />
          )
        }
        component={Link}
        to="/profile/settings"
      />
      <StyledNavigationTab
        label="Чат"
        value="chat"
        icon={navigationValue === 'chat' ? <ChatIcon /> : <ChatOutlinedIcon />}
        component={Link}
        to="/"
      />
    </StyledNavigationContainer>
  );
};
