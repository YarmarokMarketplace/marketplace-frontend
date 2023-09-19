import React, { useEffect } from 'react';
import { Stack, Typography, FormControl } from '@mui/material';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DrawerContent, ForgotPasswordBody } from '../../types';
import {
    openDrawerAction,
    setDrawerContentAction,
} from '../CustomDrawer/reducer';
import {
    StyledBox,
    StyledInput,
    StyledLabel,
    StyledSubmitBtn,
    StyledBackBtn,
    StyledVector,
} from './style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { forgotPasswordFetch } from 'redux/auth/thunk';
import { forgotPasswordStateSelector } from 'redux/auth/selector';
import { emailErrorToggleAction, isEmailSendResetAction } from 'redux/auth/reducer';
import success from '../../img/success.svg';

const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email('Введіть коректний email')
        .required('Не забудьте ввести ваш email'),
});

const ForgotPassword = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error, isEmailSend, emailError } = useSelector(
        forgotPasswordStateSelector
    );

    useEffect(() => {
        isEmailSend && reset();
        return () => {
            dispatch(isEmailSendResetAction());
            dispatch(emailErrorToggleAction(false));
        };
    }, []);

    const onSubmit = (data: ForgotPasswordBody) => {
        dispatch(forgotPasswordFetch(data));
    };

    const handleLoginRedirect = () => {
        dispatch(openDrawerAction(true));
        dispatch(setDrawerContentAction(DrawerContent.login));
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
        mode: 'onChange',
    });

    const setHelperText = () => {
        let helperText: any = '';
        if (emailError) {
            helperText = 'Обліковий запис з такою електронною адресою не існує';
        } else {
            helperText = errors.email?.message;
        }
        return helperText;
    };

    const emailSendMassage = () => {
        return (
            <Stack alignItems="center" textAlign="center" spacing={4} width="20.5rem">
                <StyledVector>
                    <img src={success} alt="success-vector" />
                </StyledVector>
                <Typography color="primary.main" variant="h4">
                    Ваш запит на зміну паролю успішно оброблено. Ми надіслали листа на
                    вказану вами адресу електронної пошти!
                </Typography>
                <Stack alignItems="center" spacing={2} width="15.5rem">
                    <Typography color="primary.dark">
                        Будь ласка, перевірте свою поштову скриньку.{' '}
                    </Typography>
                    <Typography color="primary.dark">
                        Якщо ви не отримаєте повідомлення протягом найближчих кількох
                        хвилин, перевірте папку "Спам" або "Нежадана пошта", оскільки наші
                        повідомлення іноді потрапляють туди.
                    </Typography>
                </Stack>
            </Stack>
        );
    };

    return (
        <Stack alignItems="center">
            {isEmailSend ? (
                emailSendMassage()
            ) : (
                <>
                    <Typography padding={2} color="primary.main" variant="h4">
                        Відновлення паролю
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        id="forgot-password-form"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <StyledBox>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2">
                                    Введіть свою електронну пошту і ми надішлемо вам інструкції,
                                    щодо відновлення паролю
                                </Typography>
                            </Stack>

                            <FormControl fullWidth>
                                <StyledLabel>Ваша електронна пошта</StyledLabel>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field }) => (
                                        <StyledInput
                                            helperText={setHelperText()}
                                            error={Boolean(errors?.email) || emailError}
                                            InputProps={{
                                                endAdornment: (errors.email || emailError) && (
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
                        </StyledBox>

                        <StyledSubmitBtn
                            id="reset-password-btn"
                            color="primary"
                            variant="contained"
                            type="submit"
                            disabled={!isValid}
                        >
                            Надіслати
                        </StyledSubmitBtn>
                    </form>

                    <Stack mt={2} direction="row" alignItems="center">
                        <Typography variant="body1">Повернутись до</Typography>
                        <StyledBackBtn id="login-redirect" onClick={handleLoginRedirect}>
                            Входу
                        </StyledBackBtn>
                    </Stack>
                </>
            )}
        </Stack>
    );
};

export default ForgotPassword;
