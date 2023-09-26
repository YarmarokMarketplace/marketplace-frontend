import React, { useEffect } from 'react';
import { SearchButton, SearchWrapper, StyledInput } from './style';
import { InputAdornment } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { searchValueSetAction } from '../../redux/products/reducer';

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [search, setSearch] = React.useState('');

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
    navigate('/search');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      dispatch(searchValueSetAction(search));
      navigate('/search');
    }
  };
  return (
    <SearchWrapper direction="row" spacing={3}>
      <StyledInput
        fullWidth
        placeholder="Що шукаєте?"
        size="small"
        value={search}
        onChange={handleSearchChange}
        variant="outlined"
        id="search"
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
              <SearchButton
                id="search-btn"
                onClick={handleSearchClick}
                variant="outlined"
              >
                Пошук
              </SearchButton>
            </InputAdornment>
          ),
        }}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
