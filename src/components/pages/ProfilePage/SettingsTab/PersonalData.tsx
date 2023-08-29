import React, { useEffect, useRef } from 'react';

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

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const PersonalData = () => {
    const fileUpload = useRef<HTMLInputElement>(null);
    return (
        <>
            <form
            // onSubmit={handleSubmit(onSubmit)}
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
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledFormLabel>Прізвище
                        </StyledFormLabel>
                        <TextField
                            size="small"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledFormLabel>По батькові
                        </StyledFormLabel>
                        <TextField
                            size="small"
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
                        ref={fileUpload}
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                    />
                    <UploadLabel htmlFor="upload-label"                    >
                        <UploadButton
                            onClick={() => fileUpload.current?.click()}
                        />
                    </UploadLabel>

                    <Stack direction="row" spacing={.5}>
                        <IconButton aria-label="edit">
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
                    />
                </InputWrapper>

                <ActionButton sx={{ mb: "1rem" }} variant="contained">Зберегти профіль</ActionButton>
            </form>
            <ActionButton variant="outlined" color="error">Видалити профіль</ActionButton>
        </>
    )
}

export default PersonalData;