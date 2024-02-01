import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import upload from '../../../img/upload-file.png';

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(53rem, 2fr) minmax(15rem, 0.8fr)',
  gap: theme.spacing(3),
  padding: theme.spacing(2, 0),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(0px, 1fr)',
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '1rem',
  fontWeight: 700,
  minWidth: '155px',
  wordBreak: 'break-word',
}));

export const StyledFileInput = styled(Box)(({ theme }) => ({
  border: `1px solid`,
  width: '100%',
  padding: theme.spacing(3),
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(5.5rem, 1fr))',
  '&.empty': {
    gridTemplateColumns: '1fr',
  },
  gap: theme.spacing(2),
  borderRadius: 12,
  ':hover': {
    borderColor: theme.palette.text.primary,
  },
  [theme.breakpoints.down('lg')]: {
    width: '100%',
  },
  [theme.breakpoints.down('lg')]: {
    flexWrap: 'wrap',
  },

  // ":active": {
  //   borderWidth: 2,
  //   borderColor: theme.palette.primary.main,
  // },
}));

export const StyledFileLable = styled('label')(({ theme }) => ({
  color: theme.palette.divider,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '0.75rem',
  borderRadius: 12,
}));

export const StyledPreview = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'inherit',
  maxHeight: '100%',
  objectFit: 'cover',
  borderRadius: 12,
}));

export const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  [theme.breakpoints.down('lg')]: {
    gap: theme.spacing(3),
  },
}));

export const menuStyles = {
  height: '15rem',
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
};

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
}));

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  backgroundImage: `url(${upload})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  height: '7.3rem',
  width: `100%`,
}));
