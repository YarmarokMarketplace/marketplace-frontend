import React from "react";
import { SearchButton, SearchWrapper } from "./style";
import { InputAdornment, TextField } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <SearchWrapper direction="row" spacing={3}>
      <TextField
        fullWidth
        placeholder="Що шукаєте?"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <SearchButton variant="outlined">Пошук</SearchButton>
    </SearchWrapper>
  );
};

export default SearchBar;
