import React, { useEffect } from "react";
import { Stack, FormControl, Typography, Checkbox } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    StyledBox,
    StyledInput,
    StyledLabel,
    StyledSubmitBtn,
    StyledResetBtn,
    StyledSignInBtn,
    SaveDataControlLabel
} from "./style";
import { AppDispatch } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { userLoginStateSelector } from "./selector";
import { openDrawerAction, setDrawerContentAction } from "../CustomDrawer/reducer";
import { DrawerContent, LoginBody } from "../../types";
import { userLoginFetch } from './thunk';
import { emailErrorToggleAction, isLoginResetAction } from "./reducer";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Введіть коректний email")
        .required("Не забудьте ввести ваш email"),
    password: yup
        .string()
        .required("Не забудьте ввести пароль")
        .min(8, "Пароль має містити мінімум 8 символів")
});

const Login = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error, isLogin, emailError } = useSelector(
        userLoginStateSelector
    );

    const handleResetPasswordRedirect = () => {
        dispatch(openDrawerAction(true));
        dispatch(setDrawerContentAction(DrawerContent.resetPassword));
    }

    const handleRegisterRedirect = () => {
        dispatch(openDrawerAction(true));
        dispatch(setDrawerContentAction(DrawerContent.register));
    }

    useEffect(() => {
        return () => {
            const values = getValues();
            localStorage.setItem("logInput", JSON.stringify({ ...values, password: "" }));
            // dispatch(isLoginResetAction());
            dispatch(emailErrorToggleAction(false));
        };
    }, []);

    useEffect(() => {
        console.log(isLogin);

        if (isLogin) {
            reset();
            dispatch(openDrawerAction(false));
            // dispatch(isLoginResetAction()); // Виклик екшену для зміни isLogin назад на false
            dispatch(emailErrorToggleAction(false));
        }

        // ...
    }, [isLogin]);

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
        defaultValues: JSON.parse(localStorage.getItem("logInput")!),
        mode: "onChange",
    });

    const helperText = emailError ?
        "Email або пароль невірні" :
        errors.email?.message;

    return (
        <Stack alignItems="center">
            <Typography padding={2} color="primary.main" variant="h4">
                Увійти
            </Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                id="login-form"
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <StyledBox>
                    <Stack spacing={1}>
                        <Typography fontWeight={700} variant="body1">
                            Увійти в кабінет
                        </Typography>
                        <Typography variant="subtitle2">
                            Увійдіть, щоб купувати та продавати, додавати
                            товари до обраних та листуватись з продавцем
                        </Typography>
                    </Stack>
                    <FormControl fullWidth>
                        <StyledLabel>Електронна пошта</StyledLabel>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <StyledInput
                                    helperText={helperText}
                                    error={Boolean(errors?.email)}
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
                                    type="password"
                                    helperText={helperText}
                                    error={Boolean(errors.password)}
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

                <SaveDataControlLabel control={<Checkbox />} label="Зберегти мої дані для входу" />

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
    )
}

export default Login;