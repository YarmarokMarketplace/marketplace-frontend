import React from 'react';
import { useNavigate } from 'react-router';
import { Typography, Button } from "@mui/material";
import { StyledImg, StyledStack } from "./style";
import errorImg from '../../img/not-found-error.png';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <StyledStack
            role="alert"
            direction="column"
            alignItems="center"
        >
            <StyledImg src={errorImg} id="not-found-img" />
            <Typography fontSize="2rem" fontWeight="500">На жаль, запитана сторінка не знайдена</Typography>
            <Typography fontSize="1.125rem" fontWeight="500">Ми вибачаємось за незручності і працюємо над цим</Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    mt: "2.5rem"
                }}
            >До головної сторінки</Button>
        </StyledStack>
    )
}

export default NotFoundPage;