import React from "react";

import { Stack, Typography } from "@mui/material";

import ChatButton from "../../ChatButton";
import CategoryItem from "./CategoryItem";
import SearchBar from "../../SearchBar";

import {
  CategoriesWrapper,
  StyledBox,
  StyledContainer,
  StyledImage,
  StyledLink,
  StyledMoreIcon,
} from "./style";

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
      <SearchBar />
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
              <CategoryItem key={index} category={category}>
                <StyledImage src="https://freepngimg.com/thumb/toy/33903-2-plush-toy-transparent-image.png" />
              </CategoryItem>
            );
          })}
          <CategoryItem category="Переглянути всі">
            <StyledMoreIcon color="primary" />
          </CategoryItem>
        </StyledBox>
      </CategoriesWrapper>
      <ChatButton />
    </StyledContainer>
  );
};

export default HomePage;
