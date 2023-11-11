import React from 'react';
import { IconButton, InputAdornment, Modal, Stack } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import SearchIcon from '@mui/icons-material/Search';
import { StyledBox, StyledInput } from './style';

interface SearchModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  search,
  onChange,
  onPress,
}) => {
  return (
    <Modal open={open} onClose={() => onClose(!open)}>
      <StyledBox>
        <Stack direction="row">
          <IconButton
            disableFocusRipple
            sx={{ width: '4rem' }}
            onClick={() => onClose(!open)}
          >
            <ArrowBackIosNewRoundedIcon
              sx={{ color: 'text.disabled' }}
              fontSize="small"
            />
          </IconButton>
          <StyledInput
            fullWidth
            placeholder="Що шукаєте?"
            size="small"
            autoFocus
            value={search}
            onChange={onChange}
            variant="outlined"
            id="search"
            onKeyDown={onPress}
            sx={{ height: '4rem' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </StyledBox>
    </Modal>
  );
};

export default SearchModal;
