import React, { useEffect } from 'react';
import {
    Stack,
    FormControl,
    Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

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
import { changeLoginSelector } from 'redux/auth/selector';
import {
    openDrawerAction,
} from '../CustomDrawer/reducer';
import {
    isEmailSendResetAction,
    emailInUseErrorToggleAction
} from 'redux/auth/reducer';
import { ChangeLoginBody } from '../../types';
import { changeLoginFetch, logoutFetch } from 'redux/auth/thunk';
import { useNavigate } from 'react-router';

const changeLoginSchema = yup.object().shape({
    email: yup
        .string()
        .matches(
            /@([\w-]+.)+[\w-]{2,6}$/,
            'Некоректна електронна адреса. Перевірте правильність введення електронної адреси.'
        )
        .required('Не забудьте ввести електронну пошту'),
});

const ChangeLogin = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isEmailSend, emailInUseError } = useSelector(
        changeLoginSelector
    );

    useEffect(() => {
        isEmailSend && reset();
        return () => {
            dispatch(isEmailSendResetAction());
            dispatch(emailInUseErrorToggleAction(false));
        };
    }, []);
    useEffect(() => {
        if (isEmailSend) {
            dispatch(logoutFetch());
            navigate('/', { replace: true });
            localStorage.removeItem("refreshToken");
        }
    }, [isEmailSend]);

    const onSubmit = (data: ChangeLoginBody) => {
        dispatch(changeLoginFetch(data));
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
        resolver: yupResolver(changeLoginSchema),
        defaultValues: { email: '' },
        mode: 'onChange',
    });


    const changeLoginMessage = () => {
        return (
            <Stack alignItems="center" textAlign="center" spacing={4} width="20.5rem">
                <StyledVector>
                    <img src={success} alt="success-vector" />
                </StyledVector>
                <Typography color="primary.main" variant="h4">
                    Ваш запит на зміну логіну успішно оброблено. Ми надіслали лист на пошту для підтвердження нового логіну.
                </Typography>
                <Stack alignItems="center" spacing={2} width="15.5rem">
                    <Typography color="primary.dark">
                        Будь ласка, перевірте свою поштову скриньку.
                    </Typography>
                    <Typography color="primary.dark">
                        Якщо ви не отримаєте повідомлення протягом найближчих кількох хвилин, перевірте папку "Спам" або
                        "Нежадана пошта", оскільки наші повідомлення іноді потрапляють туди.
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    const setHelperText = () => {
        let helperText: any = '';
        if (emailInUseError) {
            helperText = 'Обліковий запис з такою електронною адресою вже існує. Будь ласка, виберіть іншу адресу.';
        } else {
            helperText = errors.email?.message;
        }
        return helperText;
    };

    return (
        <Stack alignItems="center">
            {isEmailSend ? (
                changeLoginMessage()
            ) : (
                <>
                    <Typography padding={2} color="primary.main" variant="h4">
                        Зміна електронної адреси
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="change-login-form"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <StyledBox>
                            <Typography fontSize='1rem' fontWeight={500}>
                                Після зміни електронної адреси, вам необхідно повторно авторизуватись!
                            </Typography>

                            <FormControl fullWidth>
                                <StyledLabel>Нова електронна пошта</StyledLabel>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <StyledInput
                                            helperText={setHelperText()}
                                            error={
                                                Boolean(errors?.email) ||
                                                emailInUseError
                                            }
                                            InputProps={{
                                                endAdornment: (errors.email ||
                                                    emailInUseError) && (
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

                        </StyledBox >

                        <Stack
                            direction='row'
                            justifyContent="center"
                            spacing={2}
                            width='90%'
                        >

                            <StyledChangePassBtn
                                id="change-login-btn"
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

export default ChangeLogin;