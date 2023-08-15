import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { NoProductsContainer, NoProductsImg, NoProductsTypography } from './style';

import noProductsImg from '../../../img/no-products-image.png'

const NoProductsMessage = () => {

    return (
        <NoProductsContainer>
            <Box>
                <NoProductsImg src={noProductsImg} />
            </Box>
            <Stack direction="column"
                alignItems="center">
                <NoProductsTypography variant="h4">Товари не знайдено</NoProductsTypography>
                <NoProductsTypography>
                    Спробуйте змінити параметри фільтру, чи<br />
                    скористайтесь пошуком!
                </NoProductsTypography>
            </Stack>

        </NoProductsContainer>
    )
}

export default NoProductsMessage;