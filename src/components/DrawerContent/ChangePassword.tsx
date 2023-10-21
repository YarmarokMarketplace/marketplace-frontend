import React, { useState, useEffect } from 'react';
import {
    Stack,
    FormControl,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    StyledBox,
    StyledInput,
    StyledLabel,
    StyledChangePassBtn,
    StyledVector,
} from './style';
import success from '../../img/success.svg';

import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswordSelector } from 'redux/auth/selector';
import {
    userLoginStateSelector,
    getUserStateSelector,
} from 'redux/auth/selector';
import {
    openDrawerAction,
} from '../CustomDrawer/reducer';
import {
    isPassChangedResetAction, passWrongErrorToggleAction
} from 'redux/auth/reducer';
import { ChangePasswordBody } from '../../types';
import { changePasswordFetch, logoutFetch } from 'redux/auth/thunk';
import { useNavigate } from 'react-router';

const changePasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Не забудьте ввести пароль')
        .min(8, 'Пароль має містити мінімум 8 символів'),
    newPassword: yup
        .string()
        .required('Введіть новий пароль')
        .min(8, 'Пароль має містити мінімум 8 символів')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#._?!@$%^&*-]).{8,}$/,
            'Пароль має містити лише латинські літери, хоча б одну велику літеру, одну цифру та спеціальний символ (#._?!@$%^&*-)'
        ),
});

const ChangePassword = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, passWrongError, isChanged } = useSelector(
        changePasswordSelector
    );
    const { name } = useSelector(getUserStateSelector);

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    useEffect(() => {
        isChanged && reset();
        return () => {
            dispatch(isPassChangedResetAction());
            dispatch(passWrongErrorToggleAction(false));
        };
    }, []);
    useEffect(() => {
        if (isChanged) {
            dispatch(logoutFetch());
            navigate('/', { replace: true });
            localStorage.removeItem("refreshToken");
        }
    }, [isChanged]);

    const onSubmit = (data: ChangePasswordBody) => {
        dispatch(changePasswordFetch(data));
    };

    const handleCloseDrawer = () => {
        dispatch(openDrawerAction(!open));
    }

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
        defaultValues: { password: '', newPassword: '' },
        mode: 'onChange',
    });


    const changePasswordMessage = () => {
        return (
            <Stack alignItems="center" textAlign="center" spacing={4} width="20.5rem">
                <StyledVector>
                    <img src={success} alt="success-vector" />
                </StyledVector>
                <Typography color="primary.main" variant="h4">
                    Ваш пароль успішно змінений!
                </Typography>
                <Stack alignItems="center" spacing={2} width="15.5rem">
                    <Typography color="primary.dark">
                        Для того щоб мати змогу купувати та продавати<br />
                        вам необхідно авторизуватись ще раз.
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    return (
        <Stack alignItems="center">
            {isChanged ? (
                changePasswordMessage()
            ) : (
                <>
                    <Typography padding={2} color="primary.main" variant="h4">
                        Зміна паролю
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="change-password-form"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <input
                            type="text"
                            name="username"
                            style={{ display: 'none' }}
                            defaultValue={name}
                            autoComplete="username"
                        />
                        <StyledBox>
                            <Typography fontSize='1rem' fontWeight={500}>
                                Після зміни паролю, вам необхідно повторно авторизуватись!
                            </Typography>

                            <FormControl fullWidth>
                                <StyledLabel>Ваш поточний пароль</StyledLabel>
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <StyledInput
                                            type={showPassword ? 'text' : 'password'}
                                            helperText={
                                                passWrongError
                                                    ? 'Пароль не вірний'
                                                    :
                                                    errors.password?.message
                                            }
                                            error={Boolean(errors.password) || passWrongError}
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
                                            autoComplete="password"
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <StyledLabel>Новий пароль</StyledLabel>
                                <Controller
                                    control={control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <StyledInput
                                            type={showNewPassword ? 'text' : 'password'}
                                            helperText={errors.newPassword?.message}
                                            error={Boolean(errors.newPassword)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                        >
                                                            {showNewPassword ? (
                                                                <Visibility
                                                                    color={
                                                                        Boolean(errors.newPassword) ? 'error' : 'inherit'
                                                                    }
                                                                />
                                                            ) : (
                                                                <VisibilityOff
                                                                    color={
                                                                        Boolean(errors.newPassword) ? 'error' : 'inherit'
                                                                    }
                                                                />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: { paddingRight: 1 },
                                            }}
                                            {...field}
                                            id="new-password"
                                            size="small"
                                            autoComplete="new-password"
                                        />
                                    )}
                                />
                            </FormControl>

                        </StyledBox >

                        <Stack
                            direction='row'
                            justifyContent="center"
                            spacing={2}
                            width='90%'
                        >

                            <StyledChangePassBtn
                                id="change-pass-btn"
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={!isValid}
                            >
                                Змінити
                            </StyledChangePassBtn>
                            <StyledChangePassBtn
                                onClick={handleCloseDrawer}
                                variant='outlined'
                            >Скасувати</StyledChangePassBtn>
                        </Stack>
                    </form >
                </>
            )}
        </Stack >
    )
}

export default ChangePassword;