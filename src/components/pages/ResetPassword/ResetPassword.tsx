import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'src/store';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
    Stack,
    FormControl,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
    StyledInput,
    StyledLabel,
    StyledSubmitBtn,
} from '../../DrawerContent/style';
import { StyledBox, StyledStack, StyledImg } from './style';
import { ResetPasswordBody } from 'src/types';
import { resetPasswordFetch } from 'redux/auth/thunk';
import { resetPasswordSelector } from 'redux/auth/selector';
import { isResetPassResetAction } from 'redux/auth/reducer';
import resetImg from 'src/img/reset-password-image.png';

const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Не забудьте ввести пароль')
        .min(8, 'Пароль повинен мати мінімум 8 символів')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#._?!@$%^&*-]).{8,}$/,
            'Пароль має містити лише латинські літери, хоча б одну велику літеру, одну цифру та спеціальний символ (#._?!@$%^&*-)'
        ),
});

const ResetPassword = () => {
    const dispatch: AppDispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { resetId, resetToken } = useParams();
    const { isReset, isTokenExpired } = useSelector(resetPasswordSelector);

    useEffect(() => {
        return () => {
            dispatch(isResetPassResetAction());
        };
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        defaultValues: { password: '' },
        mode: 'onChange',
    });

    const onSubmit = (data: ResetPasswordBody) => {
        console.log(resetId, resetToken)
        if (resetId && resetToken) {
            dispatch(resetPasswordFetch({ data: data, resetId, resetToken: resetToken }));
        }
    };

    const resetPasswordMessage = () => {
        return (
            <StyledStack
                direction="column"
                alignItems="center"
            >
                <StyledImg src={resetImg} id="reset-password-img" />
                <Stack alignItems="center" spacing={2} width="32rem">
                    <Typography fontSize="2rem" fontWeight="500">Ваш пароль успішно змінений!</Typography>
                    <Typography fontSize="1.125rem" fontWeight="500" textAlign="center">
                        Для того щоб мати змогу купувати та продавати<br />
                        вам необхідно авторизуватись ще раз.
                    </Typography>
                </Stack>
            </StyledStack >
        )
    }

    return (
        <>
            {
                isReset ? (
                    resetPasswordMessage()
                ) : (
                    <Stack
                        alignItems="center"
                        justifyContent='center'
                        height='60vh'>
                        <Stack alignItems="center" width='25rem'>
                            <StyledBox>
                                <Typography color="primary.main" variant="h4" sx={{ textAlign: 'center' }}>
                                    Новий пароль
                                </Typography>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    id="reset-password-form"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <FormControl fullWidth>
                                        <StyledLabel>Новий пароль</StyledLabel>
                                        <Controller
                                            control={control}
                                            name="password"
                                            render={({ field }) => (
                                                <StyledInput
                                                    type={showPassword ? 'text' : 'password'}
                                                    helperText={
                                                        isTokenExpired ?
                                                            'Термін дії посилання минув' :
                                                            errors.password?.message
                                                    }
                                                    error={Boolean(errors.password) || isTokenExpired}
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
                                                    id="reset-password-input"
                                                    size="small"
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </form >
                            </StyledBox>

                            <StyledSubmitBtn
                                id="reset-btn"
                                color="primary"
                                variant="contained"
                                type="submit"
                                form="reset-password-form"
                                disabled={!isValid}
                            >
                                Підтвердити
                            </StyledSubmitBtn>

                        </Stack >
                    </Stack>
                )
            }
        </>
    );
}

export default ResetPassword;