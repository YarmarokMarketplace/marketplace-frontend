import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { getUserStateSelector } from 'redux/auth/selector';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Stack, TextField, IconButton } from '@mui/material';
import {
    StyledFormLabel,
    StyledStar,
    InputWrapper,
    HeaderTypography,
    DescriptionTypography,
    UploadButton,
    UploadLabel,
    ActionButton
} from "./style";
import Avatar from '../../../../img/profile-avatar-upload.png'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { UpdateUserInput } from '../../../../types';
import { updateUserFetch } from 'redux/auth/thunk';
import SnackbarSuccessMessage from 'src/components/SnackbarMessage/SnackbarSuccessMessage';
import SnackbarErrorMessage from 'src/components/SnackbarMessage/SnackbarErrorMessage';

const personalDataSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Мінімальна довжина 2 символи')
        .matches(
            /^[^\s*!@#$%^&(),.]+$/g,
            "Некоректне ім'я. Ім'я не може містити символи (!@#$%^&*.,) та пробіл."
        )
        .required('Не забудьте ввести ваше ім’я'),
    lastname: yup
        .string()
        .matches(
            /^(?:[^\s*!@#$%^&(),.]*)$/g,
            "Не може містити символи (!@#$%^&*.,) та пробіл."
        ),
    patronymic: yup
        .string()
        .matches(
            /^(?:[^\s*!@#$%^&(),.]*)$/g,
            "Не може містити символи (!@#$%^&*.,) та пробіл."
        ),
    phone: yup
        .string()
        .max(13, 'Телефон повинен мати максимум 13 символів')
        .transform((value, originalValue) => {
            // Використовуйте метод .replace() для видалення нецифрових символів
            return value.replace(/[^0-9+]/g, '');
        })
        .matches(
            /^(?:$|[\d()+]{10,13})$/,
            'Невірний формат номеру'
        ),
});

const PersonalData = () => {
    const dispatch: AppDispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);
    type UserType = {
        id: string;
        name: string;
        lastname?: string;
        patronymic?: string;
        avatarURL?: string | any;
        phone?: string;
    };
    const user: UserType = useSelector(getUserStateSelector);
    const userCopy = { ...user }

    const replaceInputSpaces = (obj: UserType) => {
        const hasSpaces = Object.values(obj).some((value: any) => {
            return value.includes(" ");
        });
        if (hasSpaces) {
            if (obj.phone == ' ') {
                obj.phone = obj.phone.replace(/\s+/, '');
            }
            if (obj.lastname == ' ') {
                obj.lastname = obj.lastname.replace(/\s+/, '');
            }
            if (obj.patronymic == ' ') {
                obj.patronymic = obj.patronymic.replace(/\s+/, '');
            }
        }
    }
    replaceInputSpaces(userCopy)

    const [localUser, setLocalUser] = useState({ ...userCopy });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const phoneValue = value.replace(/[^0-9+]/g, '');
            // e.target.value
            console.log(phoneValue)
            setLocalUser({
                ...localUser,
                'phone': phoneValue,
            });
        } else {
            setLocalUser({
                ...localUser,
                [name]: value
            });
        }
    };

    const {
        control,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(personalDataSchema),
        mode: 'onChange',
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const selectedFile = fileRef.current?.files?.[0];
        const updatedUserData: UpdateUserInput = {
            name: localUser.name,
            lastname: localUser.lastname,
            patronymic: localUser.patronymic,
            avatarURL: selectedFile,
            phone: localUser.phone,
        };

        const { name, lastname, patronymic, phone } = updatedUserData;


        const form = new FormData();
        form.append('name', name);
        lastname ? form.append('lastname', lastname) : form.append('lastname', ' ');
        patronymic ? form.append('patronymic', patronymic) : form.append('patronymic', ' ');
        phone ? form.append('phone', phone) : form.append('phone', ' ');
        selectedFile && form.append('avatarURL', selectedFile);
        dispatch(updateUserFetch({ data: form, id: user.id }));
    };
    return (
        <>
            <form
                onSubmit={onSubmit}
            >
                <HeaderTypography>
                    Персональні дані
                </HeaderTypography>
                <DescriptionTypography
                    variant="body2"
                >
                    Вкажіть ваші персональні дані
                </DescriptionTypography>

                <Stack direction="row" spacing={4}
                    sx={{
                        '& .MuiFormHelperText-root': {
                            maxWidth: "11.5rem"
                        }
                    }}>
                    <InputWrapper>
                        <StyledFormLabel>Ім'я
                            <StyledStar>*</StyledStar>
                        </StyledFormLabel>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue={localUser.name}
                            render={({ field: { onChange } }) => (
                                <TextField
                                    size="small"
                                    name="name"
                                    value={localUser.name}
                                    onChange={(event) => {
                                        onChange(event);
                                        handleInputChange(event);
                                    }}
                                    helperText={errors.name?.message}
                                    error={Boolean(errors.name)}
                                />
                            )}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledFormLabel>Прізвище
                        </StyledFormLabel>
                        <Controller
                            control={control}
                            name="lastname"
                            defaultValue={localUser.lastname}
                            render={({ field: { onChange } }) => (
                                <TextField
                                    size="small"
                                    name="lastname"
                                    value={localUser.lastname}
                                    onChange={(event) => {
                                        onChange(event);
                                        handleInputChange(event);
                                    }}
                                    helperText={errors.lastname?.message}
                                    error={Boolean(errors.lastname)}
                                />
                            )}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledFormLabel>По батькові
                        </StyledFormLabel>
                        <Controller
                            control={control}
                            name="patronymic"
                            defaultValue={localUser.patronymic}
                            render={({ field: { onChange } }) => (
                                <TextField
                                    size="small"
                                    name="patronymic"
                                    value={localUser.patronymic}
                                    onChange={(event) => {
                                        onChange(event);
                                        handleInputChange(event);
                                    }}
                                    helperText={errors.patronymic?.message}
                                    error={Boolean(errors.patronymic)}
                                />
                            )}
                        />
                    </InputWrapper>
                </Stack>

                <HeaderTypography>
                    Аватарка
                </HeaderTypography>
                <DescriptionTypography
                    variant="body2"
                >
                    Замініть системні зображення на свої
                </DescriptionTypography>

                <Stack
                    direction="column"
                    alignItems="center"
                    width="10.5rem"
                    mb="2rem"
                >
                    <input
                        type="file"
                        ref={fileRef}
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setLocalUser({ ...localUser, avatarURL: selectedFile });
                            }
                        }}
                    />
                    <UploadLabel htmlFor="upload-label"                    >
                        <UploadButton
                            sx={{
                                background: `center / contain no-repeat ${localUser.avatarURL instanceof File
                                    ? `url(${URL.createObjectURL(localUser.avatarURL)})`
                                    : `url(${localUser.avatarURL || Avatar})`
                                    }`,
                            }}
                            onClick={() => fileRef.current?.click()}
                        />
                    </UploadLabel>

                    <Stack direction="row" spacing={.5}>
                        <IconButton aria-label="edit" onClick={() => fileRef.current?.click()}>
                            <CreateOutlinedIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Stack>
                </Stack>


                <HeaderTypography>
                    Контакти
                </HeaderTypography>
                <DescriptionTypography
                    variant="body2"
                >
                    Вкажіть ваші контактні дані
                </DescriptionTypography>
                <InputWrapper>
                    <StyledFormLabel>Номер телефону
                    </StyledFormLabel>
                    <Controller
                        control={control}
                        name="phone"
                        defaultValue={localUser.phone}
                        render={({ field: { onChange } }) => (
                            <TextField
                                size="small"
                                name="phone"
                                value={localUser.phone}
                                onChange={(event) => {
                                    onChange(event);
                                    handleInputChange(event);
                                }}
                                helperText={errors.phone?.message}
                                error={Boolean(errors.phone)}
                            />
                        )}
                    />

                </InputWrapper>

                <ActionButton sx={{ mb: "1rem" }} variant="contained" type="submit" disabled={!isValid}>Зберегти профіль</ActionButton>
            </form>
            <ActionButton variant="outlined" color="error">Видалити профіль</ActionButton>
            <SnackbarSuccessMessage>
                Дані успішно збережено!
            </SnackbarSuccessMessage>
            <SnackbarErrorMessage>
                Помилка при збереженні
            </SnackbarErrorMessage>
        </>
    )
}

export default PersonalData;