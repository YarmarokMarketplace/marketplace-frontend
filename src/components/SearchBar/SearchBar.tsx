import React, { useEffect } from 'react';
import {
  SearchButton,
  SearchSmButton,
  SearchWrapper,
  StyledInput,
  ProfileButton,
} from './style';
import {
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import {
  productFilterPriceAction,
  searchValueSetAction,
} from 'redux/products/reducer';
import SearchModal from './SearchModal';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { openProfileDrawerAction } from '../ProfileMenuDrawer/reducer';

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const search = localStorage.getItem('search');
    if (search) {
      setSearch(search);
    }
  }, []);
  const navigate = useNavigate();

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
    localStorage.setItem('search', event.target.value);
  };

  const handleSearchClick = () => {
    dispatch(searchValueSetAction(search));
    dispatch(productFilterPriceAction(''));
    localStorage.removeItem('price');
    navigate('/search');
    setOpenModal(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!search) return;
    if (event.key === 'Enter') {
      handleSearchClick();
      event.preventDefault();
      if (openModal) {
        setOpenModal(false);
      }
    }
  };
  const handleOpenProfileDrawer = () => {
    dispatch(openProfileDrawerAction(true));
  };

  return (
    <SearchWrapper direction='row' spacing={3}>
      {isSmScreen ? (
        <>
          <SearchSmButton
            startIcon={<SearchIcon />}
            fullWidth
            color='secondary'
            onClick={() => setOpenModal(!openModal)}
          />
          <ProfileButton
            startIcon={<PersonRoundedIcon />}
            color='secondary'
            onClick={handleOpenProfileDrawer}
          />
        </>
      ) : (
        <StyledInput
          fullWidth
          placeholder='Що шукаєте?'
          size='small'
          value={search}
          onChange={handleSearchChange}
          variant='outlined'
          id='search'
          onKeyDown={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
                <SearchButton
                  id='search-btn'
                  onClick={handleSearchClick}
                  variant='outlined'
                  disabled={!search}
                >
                  Пошук
                </SearchButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      <SearchModal
        open={openModal}
        onChange={handleSearchChange}
        onPress={handleKeyPress}
        onClose={setOpenModal}
        search={search}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
