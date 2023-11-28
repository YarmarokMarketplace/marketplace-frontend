import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
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

export const StyledNavigationButton = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    pointerEvent: 'none',
  },
  svg: {
    color: theme.palette.white,
  },
}));
