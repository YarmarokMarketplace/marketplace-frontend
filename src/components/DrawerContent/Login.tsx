import React, { ReactEventHandler, useEffect } from "react";
import { Stack, FormControl, Typography, Checkbox } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

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
import { rememberLoginToggleAction } from "./reducer";
import { DrawerContent, LoginBody } from "../../types";
import { userLoginFetch } from './thunk';
import { emailErrorToggleAction, requestErrorToggleAction, isLoginResetAction } from "./reducer";
import { rememberLoginToggle } from "./actions";

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
    const { loading, error, isLogin, emailError, rememberLogin, requestError } = useSelector(
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
            dispatch(requestErrorToggleAction(false));
        };
    }, []);

    useEffect(() => {
        if (isLogin) {
            reset();
            dispatch(openDrawerAction(false));
            // dispatch(isLoginResetAction()); // Виклик екшену для зміни isLogin назад на false
            dispatch(emailErrorToggleAction(false));
            dispatch(requestErrorToggleAction(false));
        }
    }, [isLogin]);

    useEffect(() => {
        localStorage.setItem('rememberLogin', JSON.stringify(rememberLogin));
    }, [rememberLogin])

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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(rememberLoginToggleAction(event.target.checked));
    }

    const handleBeforeUnload = () => {
        // Видалити значення з локального сховища
        // if (!rememberLogin) {
        // localStorage.removeItem('persist:login');
        // localStorage.clear();
        localStorage.removeItem('persist:login');
        // }
    };

    // useEffect(() => {
    //     window.addEventListener('unload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('unload', handleBeforeUnload);
    //     };
    // }, [])

    const setHelperText = () => {
        let helperText: any = "";
        if (emailError) {
            helperText = "Email або пароль невірні";
        } else if (requestError) {
            helperText = "Забагато запитів, повторіть спробу через 1 хвилину";
        } else {
            helperText = errors.email?.message;
        }
        return helperText;
    }

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
                                    helperText={setHelperText()}
                                    error={Boolean(errors?.email) || emailError || requestError}
                                    InputProps={{
                                        endAdornment: (errors.email || emailError || requestError) && (
                                            <InfoOutlinedIcon
                                                color="error"
                                                sx={{ fontSize: "1rem" }}
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
                                    type="password"
                                    helperText={emailError ?
                                        "Email або пароль невірні" :
                                        errors.password?.message}
                                    error={Boolean(errors.password) || emailError}
                                    InputProps={{
                                        endAdornment: (errors.password || emailError) && (
                                            <InfoOutlinedIcon
                                                color="error"
                                                sx={{ fontSize: "1rem" }}
                                            />
                                        ),
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

                <SaveDataControlLabel
                    control={<Checkbox
                        onChange={handleCheckboxChange}
                    />} label="Зберегти мої дані для входу" />

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