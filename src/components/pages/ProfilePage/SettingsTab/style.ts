import {
  Box,
  Typography,
  FormLabel,
  Tab,
  Button,
  Stack,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '../../../../img/profile-avatar-upload.png';

export const SettingsContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(123),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const BoxShadowContainer = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.white,
  boxShadow: '0px 4px 120px 0px rgba(151, 159, 183, 0.15)',
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  textTransform: 'none',
  minHeight: 5,
  fontSize: theme.spacing(1.75),
  fontWeight: 500,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.text.disabled}`,
  borderRadius: '15px',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    zIndex: 1,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  [theme.breakpoints.down('sm')]: {
    marginRight: theme.spacing(1.8),
  },
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  fontWeight: 700,
}));

export const StyledStar = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  paddingLeft: theme.spacing(1),
}));

export const InputWrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'baseline',
  marginBottom: theme.spacing(3.75),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}));

export const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
}));

export const DescriptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.divider,
  marginBottom: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: 0,
  fontSize: '0.875rem',
  ':hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.light,
  },
}));

export const UploadButton = styled(Button)(({ theme }) => ({
  // background: `center / contain no-repeat url(${Avatar})`,
  height: theme.spacing(21),
  width: '100%',
  borderRadius: '100px',
}));

export const UploadLabel = styled('label')(({ theme }) => ({
  width: theme.spacing(21),
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeigth: '600',
  minWidth: theme.spacing(23),
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const EmailTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
