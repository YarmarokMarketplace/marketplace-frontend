import {
    Box, Typography, Container, ListItemText,
    Card, CardContent,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const CategoryPageContainer = styled(Container)(({ theme }) => ({

}))

export const CategoryProductsWrapper = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    width: '61.5rem',
    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr",

    },
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: "1fr 1fr 1fr",

    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: "1fr 1fr",

    },
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
    borderRadius: 12,
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

export const StyledButton = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    backgroundColor: "#FFF",
    minWidth: 0,
    width: theme.spacing(4),
    height: theme.spacing(4),
    borderRadius: '20px',
    ':hover': {
        filter: "brightness(0.9)",
    }
}))

//NoProductsMessage

export const NoProductsContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    borderRadius: 20,
    padding: theme.spacing(3),
    backgroundColor: "#FFF",
    boxShadow: "0px 4px 120px 0px rgba(151, 159, 183, 0.15)",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
}))

export const NoProductsImg = styled("img")(({ theme }) => ({
    borderRadius: 12,
    height: "12.5rem",

}))

export const NoProductsTypography = styled(Typography)(({ theme }) => ({
    fontSize: '1.375rem',
    textAlign: 'center',
    lineHeight: '1.8rem',
    color: theme.palette.text.primary
}))