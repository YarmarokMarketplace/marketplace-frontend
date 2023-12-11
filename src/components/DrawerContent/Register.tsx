import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
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
  StyledLink,
  StyledLoginBtn,
  StyledVector,
  StyledTypography,
} from './style';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDrawerAction,
  setDrawerContentAction,
} from '../CustomDrawer/reducer';
import { DrawerContent, RegisterBody } from '../../types';
import { userRegisterStateSelector } from 'redux/auth/selector';
import { userRegisterFetch } from 'redux/auth/thunk';

import success from '../../img/success.svg';
import {
  emailErrorToggleAction,
  emailPatternErrorToggleAction,
  isAuthResetAction,
  requestLimitErrorToggleAction,
} from 'redux/auth/reducer';
import { SocialAuth } from './SocialAuth';

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Не забудьте ввести ваше ім’я')
    .min(2, 'Мінімальна довжина 2 символи'),
  email: yup
    .string()
    .email(
      'Некоректна електронна адреса. Перевірте правильність введення електронної адреси.'
    )
    .required('Не забудьте ввести електронну пошту'),
  password: yup
    .string()
    .required('Не забудьте ввести пароль')
    .min(8, 'Пароль повинен мати мінімум 8 символів')
    .max(16, 'Пароль може мати максимум 16 символів')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
      'Пароль має містити лише латинські літери, хоча б одну велику літеру та одну цифру'
    ),
  confirmPassword: yup
    .string()
    .required('Не забудьте ввести пароль')
    .oneOf([yup.ref('password')], 'Введені паролі не збігаються.'),
});

export interface RegisterData extends RegisterBody {
  confirmPassword: string;
}

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    loading,
    error,
    isAuth,
    emailError,
    requestLimitError,
    emailPattern,
  } = useSelector(userRegisterStateSelector);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: JSON.parse(localStorage.getItem('regInput')!),
    mode: 'onChange',
  });

  const handleLoginRedirect = () => {
    dispatch(openDrawerAction(true));
    dispatch(setDrawerContentAction(DrawerContent.login));
  };

  useEffect(() => {
    if (isAuth) {
      reset();
    }
    return () => {
      const values = getValues();
      localStorage.setItem(
        'regInput',
        JSON.stringify({ ...values, password: '', confirmPassword: '' })
      );
      dispatch(isAuthResetAction());
      dispatch(emailErrorToggleAction(false));
      dispatch(emailPatternErrorToggleAction(false));
      dispatch(requestLimitErrorToggleAction(false));
    };
  }, []);

  const onSubmit = (values: RegisterData) => {
    const { name, password, email } = values;
    dispatch(userRegisterFetch({ name, password, email }));
  };

  const handlePasswordDisplay = (name: string) => {
    if (name === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Stack alignItems="center">
      {isAuth ? (
        <Stack spacing={4} alignItems="center" textAlign="center">
          <StyledVector>
            <img src={success} alt="success-vector" />
          </StyledVector>
          <StyledTypography color="primary.main" width="15rem" variant="h4">
            Вітаємо на нашому маркетплейсі YARMAROK!{' '}
          </StyledTypography>
          <Stack spacing={2}>
            <Typography color="primary.dark">Дякуємо за реєстрацію!</Typography>
            <Typography color="primary.dark" width="15rem">
              Щоб завершити процес реєстрації, будь ласка, підтвердьте свою
              адресу електронної пошти.
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <>
          <Typography padding={2} color="primary.main" variant="h4">
            Зареєструватися
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="register-form"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <StyledBox>
              <Stack spacing={1}>
                <Typography fontWeight={700} variant="body1">
                  Створити профіль
                </Typography>
                <Typography variant="subtitle2">
                  Заповніть всі поля, щоб створити свій профіль та мати змогу
                  продавати та купувати
                </Typography>
              </Stack>
              <FormControl fullWidth>
                <StyledLabel>Ваше імʼя</StyledLabel>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <StyledInput
                      helperText={errors.name?.message}
                      error={Boolean(errors.name)}
                      id="name"
                      disabled={loading}
                      {...field}
                      size="small"
                      InputProps={{
                        endAdornment: errors.name && (
                          <InfoOutlinedIcon
                            color="error"
                            sx={{ fontSize: '1rem' }}
                          />
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <StyledLabel>Ваша електронна пошта</StyledLabel>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <StyledInput
                      helperText={
                        emailError
                          ? 'Обліковий запис з такою електронною адресою вже існує. Будь ласка, виберіть іншу адресу або використайте опцію відновлення пароля.'
                          : requestLimitError
                          ? 'Забагато запитів, повторіть спробу через 24 години'
                          : emailPattern
                          ? 'Некоректна електронна адреса. Перевірте правильність введення електронної адреси.'
                          : errors.email?.message
                      }
                      error={
                        Boolean(errors?.email) ||
                        emailError ||
                        requestLimitError ||
                        emailPattern
                      }
                      id="email"
                      disabled={loading}
                      {...field}
                      size="small"
                      InputProps={{
                        endAdornment: (errors.email ||
                          emailError ||
                          requestLimitError) && (
                          <InfoOutlinedIcon
                            color="error"
                            sx={{ fontSize: '1rem' }}
                          />
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <StyledLabel>Ваш надійний пароль</StyledLabel>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <StyledInput
                      type={showPassword ? 'text' : 'password'}
                      helperText={errors.password?.message}
                      error={Boolean(errors.password)}
                      {...field}
                      onChange={(event) => {
                        trigger('confirmPassword');
                        field.onChange(event);
                      }}
                      id="password"
                      disabled={loading}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handlePasswordDisplay('password')}
                            >
                              {showPassword ? (
                                <Visibility
                                  color={
                                    Boolean(errors.password)
                                      ? 'error'
                                      : 'inherit'
                                  }
                                />
                              ) : (
                                <VisibilityOff
                                  color={
                                    Boolean(errors.password)
                                      ? 'error'
                                      : 'inherit'
                                  }
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { paddingRight: 1 },
                      }}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <StyledLabel>Повторіть пароль</StyledLabel>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <StyledInput
                      helperText={errors.confirmPassword?.message}
                      error={Boolean(errors.confirmPassword)}
                      type={showConfirmPassword ? 'text' : 'password'}
                      disabled={loading}
                      id="confirmPassword"
                      {...field}
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                handlePasswordDisplay('confirmPassword')
                              }
                            >
                              {showConfirmPassword ? (
                                <Visibility
                                  color={
                                    Boolean(errors.confirmPassword)
                                      ? 'error'
                                      : 'inherit'
                                  }
                                />
                              ) : (
                                <VisibilityOff
                                  color={
                                    Boolean(errors.confirmPassword)
                                      ? 'error'
                                      : 'inherit'
                                  }
                                />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { paddingRight: 1 },
                      }}
                    />
                  )}
                />
              </FormControl>
              <Typography variant="subtitle2">
                Створюючи профіль на YARMAROK, ви погоджуєтесь{' '}
                <StyledLink id="rules-link" to="/rules" target="_blank">
                  з умовами використання
                </StyledLink>
              </Typography>
            </StyledBox>
            <Button
              sx={{
                width: '83%',
                mt: 3,
                fontSize: '0.875rem',
                fontWeight: 600,
                paddingY: 1,
              }}
              color="primary"
              variant="contained"
              type="submit"
              id="register-btn"
              disabled={!isValid || loading}
            >
              Зареєструватись
            </Button>
          </form>
          <SocialAuth />
          <Stack mt={2} direction="row" alignItems="center">
            <Typography variant="caption">Вже зареєстрований?</Typography>

            <StyledLoginBtn
              sx={{ fontSize: '0.75rem' }}
              variant="text"
              color="primary"
              size="small"
              id="login-redirect"
              disableTouchRipple
              title="hello"
              onClick={handleLoginRedirect}
            >
              Увійти
            </StyledLoginBtn>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default Register;
