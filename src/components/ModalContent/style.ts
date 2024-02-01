import { Box, FormLabel, Stack, Tab, Tabs, styled } from '@mui/material';

export const StyledImageWrapper = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  width: theme.spacing(11),
  height: theme.spacing(11),
  borderRadius: 8,
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const StyledLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
}));

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  textTransform: 'none',
  minHeight: 5,
  fontSize: theme.spacing(1.75),
  fontWeight: 700,
  margin: 0,
  color: theme.palette.text.primary,
  borderRadius: '8px',
  '&.Mui-selected': {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.white,
    zIndex: 1,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledTabContainer = styled(Tabs)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 8,
  '& .MuiTabs-indicator': {
    background: 'none',
  },
  minHeight: '2rem',
}));

export const StyledContainer = styled(Stack)(({ theme }) => ({
  overflowY: 'auto',
  padding: theme.spacing(2),

  maxHeight: 'calc(100vh - 150px)',
  scrollbarWidth: 'auto',
  width: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    width: '0.2em',
    marginLeft: '8px',
  },
  '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
}));

export const PersonalInfoContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
  gap: '8px',
}));

export const DeliveryInfoContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
  gap: '8px',
}));

export const UkrPostInfoContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1.5fr 1fr 1fr',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
  gap: '8px',
}));
