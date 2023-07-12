import React, { useState } from "react";

import { useNavigate } from "react-router";
import { Stack, Typography, Chip, CardActionArea, CardActions } from "@mui/material";
import {
    StyledCard,
    StyledCardWrapper,
    StyledImgWrapper,
    StyledCardContent,
    TitleTypography,
    StyledImg,
    StyledButton
} from "./style";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Moment from 'react-moment';
import { ProductItem } from "../../../types";
import placeholderImg from '/src/img/placeholder-image.png'

interface ProductItemProp {
    product: ProductItem;
}

const ProductItem: React.FC<ProductItemProp> = ({ product }) => {
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const { _id, photos, title, location, createdAt, price } = product;

    const handleItemClick = () => {
        navigate(`/category/${product._id}`);
    };

    const handleFavoriteClick = (e: any) => {
        e.stopPropagation();
        console.log("Favorite")
    }

    const handleImageError = () => {
        setError(true);
    }

    return (
        <StyledCard>
            <CardActionArea onClick={handleItemClick}>
                <StyledCardWrapper>
                    <StyledImgWrapper>
                        {error ?
                            (<StyledImg
                                src={placeholderImg}
                                id={`product-${_id.slice(20)}`} />
                            ) : (
                                <StyledImg
                                    src={photos}
                                    id={`product-${_id.slice(20)}`}
                                    onError={handleImageError} />)
                        }

                    </StyledImgWrapper>

                    <StyledCardContent>
                        <TitleTypography gutterBottom variant="h5">
                            {title}
                        </TitleTypography>
                        <Typography variant="body2" color="text.secondary"
                            sx={{ fontSize: "0.75rem", fontWeight: "500", pb: ".5rem" }}>
                            {location} -
                            {<Moment format="DD/MM/YY">
                                {createdAt}
                            </Moment>}
                        </Typography>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between">
                            <Chip label={`${price} грн`} size="small" color="primary" variant="outlined"
                                sx={{ fontSize: "0.875rem", fontWeight: "600", }} />
                            <CardActions>
                                <StyledButton
                                    onClick={handleFavoriteClick}
                                    size="small" color="primary">
                                    <FavoriteBorderOutlinedIcon fontSize="small" />
                                </StyledButton>
                            </CardActions>
                        </Stack>
                    </StyledCardContent>
                </StyledCardWrapper>
            </CardActionArea>
        </StyledCard>
    );
};

export default ProductItem;
