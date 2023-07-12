import {
    Box, Link, Typography, Container, ListItemText,
    Card, CardActionArea, CardContent,
    CardMedia, Button, CardActions,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CategoryPageContainer = styled(Container)(({ theme }) => ({

}))

export const FiltersContainer = styled(Box)(({ theme }) => ({
    width: theme.spacing(39),
    borderRadius: 20,
    padding: theme.spacing(3),
    backgroundColor: "#FFF",
    boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
    '& div.MuiButtonBase-root': {
        padding: 0
    },
    '& .filters': {
        fontSize: "1rem",
        fontWeight: 500
    },
    '& label.MuiFormLabel-root': {
        fontSize: "0.875rem",
        fontWeight: 400
    },
    '& p.MuiTypography-root': {
        margin: 0
    }
}))

export const FilterText = styled(ListItemText)(({ theme }) => ({
    "span": {
        fontSize: "1.125rem",
        fontWeight: 700
    }
}))

//CategoryHeader
export const StyledChip = styled(Chip)(({ theme }) => ({
    fontSize: "0.75rem",
    fontWeight: 400,
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.primary.contrastText,
}))

// ProductItem
export const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
}))

export const StyledCardWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
}))

export const StyledImgWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "100%"
}))

export const StyledImg = styled("img")(({ theme }) => ({
    position: "absolute",
    objectFit: "cover",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2, 0, 0),
    paddingBottom: "0 !important",

    '& .MuiCardActions-root': {
        padding: 0
    }
}))


export const TitleTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1rem",
    fontWeight: 500,
    marginBottom: theme.spacing(2),
}))

export const StyledButton = styled(Button)(({ theme }) => ({
    padding: 0,
    backgroundColor: "#FFF",
    minWidth: 0,
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: '20px',
}))