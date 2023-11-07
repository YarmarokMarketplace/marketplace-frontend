import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  styled,
} from '@mui/material';

export const StyledNavigationContainer = styled(BottomNavigation)(
  ({ theme }) => ({
    backgroundColor: theme.palette.white,
    boxShadow: '0px -4px 4px 0px rgba(0, 0, 0, 0.05)',
    width: '100%',
    height: theme.spacing(9),
  })
);
export const StyledNavigationTab = styled(BottomNavigationAction)(
  ({ theme }) => ({
    minWidth: theme.spacing(7),
    color: theme.palette.text.primary,

    '&.Mui-selected': {
      color: theme.palette.primary.dark,
    },
  })
);

export const StyledNavigationButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(2),
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
  },
  svg: {
    color: theme.palette.white,
  },
}));
