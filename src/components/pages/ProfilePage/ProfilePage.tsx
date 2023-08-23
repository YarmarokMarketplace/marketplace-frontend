import React, { useEffect, useState } from 'react';

import {
    Box, Typography,
    Stack, Divider
} from '@mui/material';
import {
    MenuContainer,
    StyledLink,
    StyledButton
} from "./style";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsTab from './SettingsTab/SettingsTab';

const ProfilePage = () => {

    const handleMenuClick = (event: React.MouseEvent<HTMLLIElement>) => {
    }

    return (
        <Stack
            direction="row"
            alignItems="flex-start"
            gap="1.5rem"
        >
            <MenuContainer>
                <Box>
                    <Typography
                        variant="body1"
                        fontWeight="700"
                    >
                        Ольга
                    </Typography>
                    <Typography
                        variant="body2"
                        color='#8D9092'
                    >
                        test@ukr.net
                    </Typography>
                </Box>
                <Divider sx={{ mt: ".5rem", mb: "1.5rem" }} />
                <Stack gap="1rem" mb="3.5rem">
                    <StyledLink id="profile-advert" to="/profile">
                        Оголошення
                    </StyledLink>
                    <StyledLink id="profile-sell" to="/profile">
                        Продаю
                    </StyledLink>
                    <StyledLink id="profile-buy" to="/profile">
                        Купую
                    </StyledLink>
                    <StyledLink id="profile-selected" to="/profile">
                        Обране
                    </StyledLink>
                    <StyledLink id="profile-viewed" to="/profile">
                        Переглянуті товари
                    </StyledLink>
                    <StyledLink id="profile-settings" to="/profile">
                        Налаштування
                    </StyledLink>
                </Stack>

                <StyledButton variant="text" endIcon={<LogoutIcon />}>
                    Вийти
                </StyledButton>
            </MenuContainer>
            <SettingsTab />
        </Stack >
    )
}

export default ProfilePage;
