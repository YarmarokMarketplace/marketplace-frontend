import React from "react";
import { SearchButton, SearchWrapper, StyledInput } from "./style";
import { InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <SearchWrapper direction="row" spacing={3}>
      <StyledInput
        fullWidth
        placeholder="Що шукаєте?"
        size="small"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
              <SearchButton variant="outlined">Пошук</SearchButton>
            </InputAdornment>
          ),
        }}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
