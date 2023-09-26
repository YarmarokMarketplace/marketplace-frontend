import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { productsStateSelector } from 'redux/products/selector';
import { AppDispatch } from '../../../store';

import {
  currentPageSetAction,
  productSortAction,
} from '../../../redux/products/reducer';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import TuneIcon from '@mui/icons-material/Tune';
import SortDrawer from './SortDrawer';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

interface CategorySortProps {
  openFilterModal: boolean;
  setOpenFilterModal: (value: boolean) => void;
}

const CategorySort: React.FC<CategorySortProps> = ({ setOpenFilterModal }) => {
  const { sort } = useSelector(productsStateSelector);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minHeight: 5,
    fontSize: '1rem',
    fontWeight: 500,
    '&.Mui-selected': {
      color: 'black',
      zIndex: 1,
    },
  }));
  const SortTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    minHeight: 5,
    fontSize: '1rem',
    fontWeight: 500,
    width: '100%',
    alignItems: 'start',
    '&.Mui-selected': {
      color: 'black',
      zIndex: 1,
    },
    '&.Mui-selected svg': {
      borderColor: '#29271A !important',
    },
    padding: '1rem 0 1rem 2rem',
  }));
  const styledSortIcons = {
    fontSize: 20,
    border: '2px solid #C6C7C8',
    borderRadius: '20px',
    padding: '.05rem',
    marginRight: '.8rem',
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    localStorage.setItem('sort', newValue);
    dispatch(productSortAction(newValue));
    dispatch(currentPageSetAction(1));
    setOpen(false);
  };

  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {!isMdScreen && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={3}
        >
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Сортувати за:
          </Typography>
          <Tabs
            variant="standard"
            //Styling outside the .tsx disables animation
            sx={{
              minHeight: '2rem',
              height: '2.375rem',
              borderRadius: 3,
              padding: 0.7,
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                maxHeight: '100%',
              },
              '& .MuiTabs-indicator': {
                height: '100%',
                borderRadius: '12px',
                bgcolor: '#FFF',
              },
            }}
            value={sort}
            onChange={handleChange}
          >
            <StyledTab value="newest" label="Новішими" />
            <StyledTab value="cheapest" label="Дешевшими" />
            <StyledTab value="expensive" label="Дорожчими" />
          </Tabs>
        </Stack>
      )}
      {isMdScreen && (
        <Stack direction="row" spacing={3}>
          <Button
            onClick={() => setOpenFilterModal(true)}
            sx={{
              border: '1px solid',
              borderColor: theme.palette.text.disabled,
              fontSize: '0.875rem',
              color: theme.palette.text.primary,
            }}
            color="secondary"
            variant="outlined"
            endIcon={<TuneIcon />}
          >
            Фільтри
          </Button>
          <IconButton
            aria-label="sort"
            onClick={() => setOpen(true)}
            sx={{
              border: '1px solid',
              borderColor: theme.palette.text.disabled,
              borderRadius: '12px',
              fontSize: '0.875rem',
              color: theme.palette.text.primary,
            }}
          >
            <ImportExportIcon />
          </IconButton>
        </Stack>
      )}
      {isMdScreen && (
        <SortDrawer open={open} setOpen={setOpen}>
          <Typography
            variant="body1"
            fontWeight="700"
            textAlign="center"
            mb="1rem"
          >
            Сортування
          </Typography>
          <Tabs
            variant="standard"
            sx={{
              '& .MuiTabs-flexContainer': {
                flexDirection: 'column',
                maxHeight: '100%',
              },
              '& .MuiTabs-indicator': {
                height: 0,
              },
              '& .MuiButtonBase-root': {
                maxWidth: '100%',
              },
            }}
            value={sort}
            onChange={handleChange}
          >
            <SortTab
              value="newest"
              label={
                <Stack direction="row" alignItems="center">
                  <StarBorderRoundedIcon style={styledSortIcons} /> Новішими
                </Stack>
              }
            />
            <SortTab
              value="cheapest"
              label={
                <Stack direction="row" alignItems="center">
                  <ArrowDownwardRoundedIcon style={styledSortIcons} /> Дешевшими
                </Stack>
              }
            />
            <SortTab
              value="expensive"
              label={
                <Stack direction="row" alignItems="center">
                  <ArrowUpwardRoundedIcon style={styledSortIcons} /> Дорожчими
                </Stack>
              }
            />
          </Tabs>
        </SortDrawer>
      )}
    </Box>
  );
};

export default CategorySort;
