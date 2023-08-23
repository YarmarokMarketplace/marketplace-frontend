import React, { useEffect } from 'react';

import {
    Stack, TextField,
} from '@mui/material';
import {
    StyledFormLabel, StyledStar,
    InputWrapper, HeaderTypography,
    DescriptionTypography, StyledButton
} from "./style";

const Login_Password = () => {

    const handleChangeEmail = () => {

    }

    const handleChangePassword = () => {

    }

    return (
        <>
            <HeaderTypography>
                Логін та пароль
            </HeaderTypography>
            <DescriptionTypography
                variant="body2"
            >
                В якості логіна ви можете використовувати свій email
            </DescriptionTypography>

            <InputWrapper>
                <StyledFormLabel>Логін
                </StyledFormLabel>
                <TextField
                    disabled
                    size="small"
                    value="test@test.com"
                />
            </InputWrapper>
            <StyledButton
                sx={{ mt: "-3.5rem" }}
                onClick={handleChangeEmail}
                variant="text"
                size="small"
                color="primary"
                id="change-email"
                disableTouchRipple
            >
                Змінити email
            </StyledButton>
            <InputWrapper>
                <StyledFormLabel>Пароль
                </StyledFormLabel>
            </InputWrapper>
            <StyledButton
                sx={{ mt: "-3rem" }}
                onClick={handleChangePassword}
                variant="text"
                size="small"
                color="primary"
                id="change-email"
                disableTouchRipple
            >
                Змінити пароль
            </StyledButton>
            <Stack
                alignItems="flex-end"
            >
                <StyledButton
                    // sx={{ mt: "-3rem" }}
                    // onClick={}
                    variant="text"
                    size="small"
                    color="primary"
                    id="change-email"
                    disableTouchRipple
                >
                    Допомога або скарга
                </StyledButton>
            </Stack>
        </>
    )
}

export default Login_Password;