import React, { useEffect, useState } from 'react';
import {
  Stack,
  FormControl,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  StyledBox,
  StyledInput,
  StyledLabel,
  StyledSubmitBtn,
  StyledResetBtn,
  StyledSignInBtn,
} from './style';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginStateSelector } from 'redux/auth/selector';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../CustomDrawer/reducer';
import {
  rememberLoginToggleAction,
  emailErrorToggleAction,
  requestErrorToggleAction,
  notVerifiedErrorToggleAction,
} from 'redux/auth/reducer';
import { DrawerContent, LoginBody } from '../../types';
import { userLoginFetch } from 'redux/auth/thunk';

import { SocialAuth } from './SocialAuth';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введіть коректний email')
    .required('Не забудьте ввести ваш email'),
  password: yup
    .string()
    .required('Не забудьте ввести пароль')
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(16, 'Пароль може мати максимум 16 символів'),
});

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    loading,
    error,
    isLogin,
    emailError,
    rememberLogin,
    requestError,
    notVerifiedError,
    emailPatternError,
  } = useSelector(userLoginStateSelector);

  const [showPassword, setShowPassword] = useState(false);

  const handleResetPasswordRedirect = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.resetPassword));
  };

  const handleRegisterRedirect = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.register));
  };

  useEffect(() => {
    return () => {
      const values = getValues();
      localStorage.setItem(
        'logInput',
        JSON.stringify({ ...values, password: '' })
      );
      dispatch(emailErrorToggleAction(false));
      dispatch(requestErrorToggleAction(false));
      dispatch(notVerifiedErrorToggleAction(false));
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      reset();
      dispatch(openDrawerAction(false));
      dispatch(emailErrorToggleAction(false));
      dispatch(requestErrorToggleAction(false));
      dispatch(notVerifiedErrorToggleAction(false));
    }
  }, [isLogin]);

  useEffect(() => {
    localStorage.setItem('rememberLogin', JSON.stringify(rememberLogin));
  }, [rememberLogin]);

  const onSubmit = (data: LoginBody) => {
    dispatch(userLoginFetch(data));
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: JSON.parse(localStorage.getItem('logInput')!),
    mode: 'onChange',
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(rememberLoginToggleAction(event.target.checked));
  };

  const setHelperText = () => {
    let helperText: any = '';
    if (emailError) {
      helperText = 'Email або пароль невірні';
    } else if (requestError) {
      helperText = 'Забагато запитів, повторіть спробу через 1 хвилину';
    } else if (notVerifiedError) {
      helperText = 'Email не підтверджено. Підтвердіть свою електронну пошту';
    } else if (emailPatternError) {
      helperText =
        'Некоректна електронна адреса. Перевірте правильність введення електронної адреси.';
    } else {
      helperText = errors.email?.message;
    }
    return helperText;
  };

  return (
    <Stack alignItems="center">
      <Typography padding={2} color="primary.main" variant="h4">
        Увійти
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="login-form"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <StyledBox>
          <Stack spacing={1}>
            <Typography fontWeight={700} variant="body1">
              Увійти в кабінет
            </Typography>
            <Typography variant="subtitle2">
              Увійдіть, щоб купувати та продавати, додавати товари до обраних та
              листуватись з продавцем
            </Typography>
          </Stack>
          <FormControl fullWidth>
            <StyledLabel>Електронна пошта</StyledLabel>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <StyledInput
                  helperText={setHelperText()}
                  error={
                    Boolean(errors?.email) ||
                    emailError ||
                    requestError ||
                    notVerifiedError ||
                    emailPatternError
                  }
                  InputProps={{
                    endAdornment: (errors.email ||
                      emailError ||
                      requestError ||
                      notVerifiedError) && (
                      <InfoOutlinedIcon
                        color="error"
                        sx={{ fontSize: '1rem' }}
                      />
                    ),
                  }}
                  id="email"
                  {...field}
                  size="small"
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <StyledLabel>Пароль</StyledLabel>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <StyledInput
                  type={showPassword ? 'text' : 'password'}
                  helperText={
                    emailError
                      ? 'Email або пароль невірні'
                      : errors.password?.message
                  }
                  error={Boolean(errors.password) || emailError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Visibility
                              color={
                                Boolean(errors.password) ? 'error' : 'inherit'
                              }
                            />
                          ) : (
                            <VisibilityOff
                              color={
                                Boolean(errors.password) ? 'error' : 'inherit'
                              }
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { paddingRight: 1 },
                  }}
                  {...field}
                  id="password"
                  size="small"
                />
              )}
            />
          </FormControl>

          <StyledResetBtn onClick={handleResetPasswordRedirect}>
            Забули пароль?
          </StyledResetBtn>
        </StyledBox>

        <StyledSubmitBtn
          id="login-btn"
          color="primary"
          variant="contained"
          type="submit"
          disabled={!isValid}
        >
          Увійти
        </StyledSubmitBtn>
      </form>
      <SocialAuth />
      <Stack mt={2} direction="row" alignItems="center">
        <Typography variant="caption">Немає профілю?</Typography>
        <StyledSignInBtn
          variant="text"
          color="primary"
          size="small"
          id="register-redirect"
          disableTouchRipple
          onClick={handleRegisterRedirect}
        >
          Зареєструйтесь
        </StyledSignInBtn>
      </Stack>
    </Stack>
  );
};

export default Login;
