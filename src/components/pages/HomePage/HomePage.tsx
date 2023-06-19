import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  CategoriesWrapper,
  SearchButton,
  SearchWrapper,
  StyledBox,
  StyledCard,
  StyledContainer,
  StyledImage,
  StyledImgWrapper,
  StyledItemWrapper,
  StyledLink,
} from "./style";

import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const categories = [
  "Дитячій світ",
  "Нерухомість",
  "Авто",
  "Запчастини для транспорту",
  "Тварини",
  "Дім і сад",
  "Робота",
  "Бізнес та послуги",
  "Мода і стиль",
  "Хобі, відпочінок і спорт",
  "Обмін",
  "Repair",
  "Work",
  "Animals",
  "Goods to win",
  "Hobbies, recreation, sports",
];

const HomePage = () => {
  return (
    <StyledContainer maxWidth="xl">
      <SearchWrapper direction="row" spacing={3}>
        <TextField
          fullWidth
          placeholder="Що шукаєте?"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <SearchButton variant="outlined">Пошук</SearchButton>
      </SearchWrapper>
      <CategoriesWrapper>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Головні рубрики</Typography>
          <StyledLink to="/categories">Всі</StyledLink>
        </Stack>
        <StyledBox>
          {categories.slice(0, 11).map((category, index) => {
            return (
              <StyledItemWrapper key={index} spacing={2}>
                <StyledCard>
                  <CardActionArea>
                    <CardContent>
                      <StyledImgWrapper>
                        <StyledImage src="https://freepngimg.com/thumb/toy/33903-2-plush-toy-transparent-image.png" />
                      </StyledImgWrapper>
                    </CardContent>
                  </CardActionArea>
                </StyledCard>
                <Typography minHeight={60} variant="h6">
                  {category}
                </Typography>
              </StyledItemWrapper>
            );
          })}
          <StyledItemWrapper spacing={2}>
            <StyledCard>
              <CardActionArea>
                <CardContent>
                  <StyledImgWrapper>
                    <MoreHorizIcon
                      color="primary"
                      sx={{ height: 100, width: 100 }}
                    />
                  </StyledImgWrapper>
                </CardContent>
              </CardActionArea>
            </StyledCard>
            <Typography minHeight={60} variant="h6">
              Переглянути всі
            </Typography>
          </StyledItemWrapper>
        </StyledBox>
      </CategoriesWrapper>
    </StyledContainer>
  );
};

export default HomePage;
