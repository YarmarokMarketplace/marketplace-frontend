import React from "react";
import { Button, Rating, Stack, Typography } from "@mui/material";
import { StyledIconButton, StyledInfoBlock, StyledShowButton } from "./style";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { ProductItem } from "../../../types";
import moment from "moment";
import { goodTypeNames } from "../../../constants";

type ProductInfoProps = {
  product: ProductItem;
};

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <Stack spacing={2}>
      <StyledInfoBlock>
        <Stack direction="row" justifyContent="space-between">
          <Typography color="success.main" variant="body1">
            {product.goodtype ? goodTypeNames[product.goodtype] : ""}
          </Typography>
          <Typography color="divider" variant="body1">
            ID:7242432
          </Typography>
        </Stack>
        <Typography variant="h4" mt={1} minHeight="4rem">
          {product.title}
        </Typography>
        <Typography mt={2} color="primary" variant="h4">
          {product.price} грн
        </Typography>
        <Stack mt={2} direction="row" justifyContent="space-between">
          <Stack spacing={2} direction="row">
            <Button
              id="buy-btn"
              sx={{ width: "7rem", paddingY: 1 }}
              variant="contained"
            >
              Купити
            </Button>
            <Button
              id="chat-btn"
              startIcon={<ChatOutlinedIcon />}
              variant="outlined"
            >
              Чат з продавцем
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <StyledIconButton id="fav-btn" size="small">
              <FavoriteBorderIcon color="primary" sx={{ fontSize: "1rem" }} />
            </StyledIconButton>
            <Typography variant="body1">В обране</Typography>
          </Stack>
        </Stack>
        <Typography mt={2} textAlign="center" color="divider" variant="body1">
          {product.location}, Опубліковано{" "}
          {moment(product.createdAt).format("DD.MM.YYYY")}
        </Typography>
      </StyledInfoBlock>
      <StyledInfoBlock>
        <Stack spacing={2}>
          <Typography fontWeight={700} variant="h6">
            Продавець
          </Typography>
          <Stack borderBottom="1px solid" borderColor="secondary.light" pb={2}>
            <Typography
              fontWeight={500}
              color="primary.main"
              variant="subtitle2"
            >
              Ольга Малова
            </Typography>
            <Typography color="divider" variant="caption">
              м. Київ
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rating color="info" size="medium" value={5} readOnly />
            <Typography color="info.main" fontWeight={700} variant="h6">
              4.9
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="caption">
              2 роки та 4 місяці на yarmarok.ua
            </Typography>
            <Typography color="primary.main" variant="caption">
              •
            </Typography>
            <Typography color="primary.main" variant="caption">
              7 відгуків
            </Typography>
          </Stack>
        </Stack>
      </StyledInfoBlock>
      <StyledInfoBlock>
        <Typography fontWeight={700} variant="h6">
          Контакти
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} mt={1}>
          <LocalPhoneOutlinedIcon color="primary" />
          <Typography variant="h6">xxx xxx xxxx </Typography>
          <StyledShowButton
            id="show-btn"
            variant="outlined"
            color="secondary"
            size="small"
          >
            Показати
          </StyledShowButton>
        </Stack>
      </StyledInfoBlock>

      <Stack direction="row" spacing={2}>
        <StyledInfoBlock sx={{ width: "50%" }}>
          <Typography fontWeight={700} variant="h6" mb={1}>
            Способи доставки
          </Typography>
          <Typography variant="body1">Доставка “Нова Пошта”</Typography>
          <Typography variant="body1">Доставка “Укрпошта”</Typography>
        </StyledInfoBlock>
        <StyledInfoBlock sx={{ width: "50%" }}>
          <Stack spacing={1}>
            <Typography fontWeight={700} variant="h6">
              Умови повернення
            </Typography>
            <Typography maxWidth="12rem" variant="body1">
              Протягом 14 днів після отримання товару
            </Typography>
          </Stack>
        </StyledInfoBlock>
      </Stack>
    </Stack>
  );
};
