import React from 'react';
import { useNavigate } from 'react-router';
import { StyledImg, StyledStack, StyledTopTypography, StyledBottomTypography, StyledButton } from "./style";
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
            <StyledTopTypography fontSize="2rem" fontWeight="500" variant='inherit'>
                На жаль, запитана сторінка не знайдена</StyledTopTypography>
            <StyledBottomTypography fontSize="1.125rem" fontWeight="500" variant='inherit'>
                Ми вибачаємось за незручності і працюємо над цим</StyledBottomTypography>
            <StyledButton
                variant="contained"
                onClick={() => navigate('/')}
            >До головної сторінки</StyledButton>
        </StyledStack>
    )
}

export default NotFoundPage;