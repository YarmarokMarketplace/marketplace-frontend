import {
  Box,
  Typography,
  Container,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Collapse,
  List,
  FormControlLabel,
  Drawer,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const CategoryPageContainer = styled(Container)(({ theme }) => ({}));

export const CategoryProductsWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  width: '61.5rem',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: theme.spacing(1),
    marginLeft: '0 !important',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

export const FiltersContainer = styled(Box)(({ theme }) => ({
  scrollbarWidth: 'auto',
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    width: '0.6em',
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
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(39),
    borderRadius: 20,
    padding: theme.spacing(3),
    backgroundColor: '#FFF',
    boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  },

  '& div.MuiButtonBase-root': {
    padding: 0,
  },
  '& .filters': {
    fontSize: '1rem',
    fontWeight: 500,
  },
  '& label.MuiFormLabel-root': {
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  '& p.MuiTypography-root': {
    margin: 0,
  },

  [theme.breakpoints.down('sm')]: {
    // display: 'none',
  },
}));

export const CategoryNameTypography = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  textAlign: 'left',
  marginBottom: 0,
  fontSize: '1.5rem',
  fontWeight: 700,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    fontWeight: 600,
  },
}));

export const FilterText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
  span: {
    fontSize: '1.125rem',
    fontWeight: 700,
  },
}));

//CategoryHeader
export const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 400,
  color: theme.palette.secondary.dark,
  backgroundColor: theme.palette.primary.contrastText,
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(0.3),
  },
}));

// ProductItem
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  '&.MuiCard-root': {
    boxShadow: 'none',
  },
  '&.inactive': {
    backgroundColor: 'rgb(206 205 205 / 47%)',
    opacity: 0.4,
  },
}));

export const StyledCardWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  paddingBottom: '100%',
}));

export const StyledImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  borderRadius: 12,
  objectFit: 'cover',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2, 0, 0),
  paddingBottom: '0 !important',

  '& .MuiCardActions-root': {
    padding: 0,
  },
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  height: '2.5rem',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {},
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

export const StyledButton = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0,
  backgroundColor: '#FFF',
  minWidth: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: '20px',
  ':hover': {
    filter: 'brightness(0.9)',
  },
}));

//NoProductsMessage

export const NoProductsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 20,
  padding: theme.spacing(3),
  backgroundColor: '#FFF',
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    marginLeft: '0 !important',
  },
}));

export const NoProductsImg = styled('img')(({ theme }) => ({
  borderRadius: 12,
  height: '12.5rem',
}));

export const NoProductsTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1.375rem',
  textAlign: 'center',
  lineHeight: '1.8rem',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
  },
}));
// Filters
// CategoryFilter
export const CategoryCollapse = styled(Collapse)(({ theme }) => ({
  '& .MuiFormControl-root': {
    margin: '0 !important',
  },
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(1),
  border: '1px solid #F3F3F3',
}));

export const CurrentCategoryListItemText = styled(ListItemText)(
  ({ theme }) => ({
    padding: '1rem',
    '&>span': {
      fontSize: '1rem',
      fontWeight: 700,
      color: theme.palette.primary.main,
    },
  })
);

export const CategoryList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  position: 'relative',
  overflow: 'auto',
  maxHeight: 185,
  paddingTop: 0,
  paddingBottom: 0,
  borderTop: '1px solid #F3F3F3',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

export const CategoryListItemText = styled(ListItemText)(({ theme }) => ({
  fontSize: '0.875rem',
  padding: theme.spacing(1, 0, 1, 2),
}));
// GoodtypeFilter
export const GoodtypeFormControlLabel = styled(FormControlLabel)(
  ({ theme }) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
  })
);

export const GoodtypeFormControlLabelMobile = styled(FormControlLabel)(
  ({ theme }) => ({
    fontSize: '0.875rem',
    // color: theme.palette.text.primary,
    border: '1px solid',
    borderRadius: '12px',
    padding: theme.spacing(1),
    margin: 0,
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
    },
  })
);

// LocationFilter
export const LocationCollapse = styled(Collapse)(({ theme }) => ({
  '& .MuiFormControl-root': {
    margin: '0 !important',
  },
  marginTop: '1rem',
  marginBottom: '1.5rem',
}));

export const StyledSortDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    padding: theme.spacing(3, 0),
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '.8rem',
  right: '.8rem',
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  maxHeight: '100vh',
  width: '100vw',
  overflowY: 'auto',
  backgroundColor: theme.palette.white,
  padding: theme.spacing(2, 3, 14),
}));
