import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { getUserStateSelector } from '../../../DrawerContent/selector';
import { RootState } from '../../../../store';

import { Stack, FormLabel, TextField, IconButton } from '@mui/material';
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
import { updateUserFetch } from '../../../DrawerContent/thunk';

const PersonalData = () => {
    const dispatch: AppDispatch = useDispatch();
    const fileRef = useRef<HTMLInputElement>(null);
    type UserType = {
        id: string;
        name: string;
        lastname?: string;
        patronymic?: string;
        avatarURL?: string | File;
        phone?: string;
    };
    const user: UserType = useSelector(getUserStateSelector);
    const [localUser, setLocalUser] = useState({ ...user });

    // useEffect(() => {
    //     setLocalUser({ ...user })
    // }, [dispatch])

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        // Оновити локальний стан при зміні значення в інпутах
        setLocalUser({ ...localUser, [name]: value });
    };

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
        lastname && form.append('lastname', lastname);
        patronymic && form.append('patronymic', patronymic);
        phone && form.append('phone', phone);
        selectedFile && form.append('avatarURL', selectedFile);
        console.log(user.id)
        // Відправити дані на сервер та отримати оновлені дані користувача
        dispatch(updateUserFetch({ data: form, id: user.id }));
        // Оновити дані користувача в Redux стані з серверною відповіддю
        // dispatch(updateUserProfile(updatedUser));
        // Скинути локальний стан
        // setLocalUser({ ...updatedUser });
        // Оповістити користувача про успішне оновлення
        alert('Дані користувача успішно оновлено');
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

                <Stack direction="row" spacing={4}>
                    <InputWrapper>
                        <StyledFormLabel>Ім'я
                            <StyledStar>*</StyledStar>
                        </StyledFormLabel>
                        <TextField
                            size="small"
                            name="name"
                            value={localUser.name}
                            onChange={handleInputChange}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledFormLabel>Прізвище
                        </StyledFormLabel>
                        <TextField
                            size="small"
                            name="lastname"
                            value={localUser.lastname}
                            onChange={handleInputChange}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledFormLabel>По батькові
                        </StyledFormLabel>
                        <TextField
                            size="small"
                            name="patronymic"
                            value={localUser.patronymic}
                            onChange={handleInputChange}
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
                    <TextField
                        size="small"
                        name="phone"
                        value={localUser.phone}
                        onChange={handleInputChange}
                    />
                </InputWrapper>

                <ActionButton sx={{ mb: "1rem" }} variant="contained" type="submit">Зберегти профіль</ActionButton>
            </form>
            <ActionButton variant="outlined" color="error">Видалити профіль</ActionButton>
        </>
    )
}

export default PersonalData;