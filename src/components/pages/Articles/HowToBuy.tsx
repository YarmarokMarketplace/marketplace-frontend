import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import buy from '../../../img/buy.png';
import delivery from '../../../img/info-buy.png';
import receive from '../../../img/receive.png';
import feedback from '../../../img/feedback.png';

const HowToBuy = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Stack spacing={3}>
        <Typography variant="h4">Як купувати на Yarmarok</Typography>
        <Stack spacing={3}>
          <Typography variant="body1">
            1. Перейдіть на головну, щоб почати шукати те, що вам потрібно, або
            перегляньте товари в категоріях, які вас цікавлять.
          </Typography>
          <Typography variant="body1">
            2. Перегляньте фото, детальний опис товару та профіль продавця.
          </Typography>
          <Typography variant="body1">
            3. Зателефонуйте продавцю чи надішліть повідомлення у чаті, щоб
            дізнатися більше про товар і домовитися про ціну.
          </Typography>
          <Typography variant="body1">
            4. Прийнявши рішення про покупку натисніть кнопку “Купити” та
            заповніть дані для відправки у віконечку, після чого продавець
            отримає ваш запит на покупку.
          </Typography>
          <img src={buy} alt="buy-screenshot" />
          <Typography variant="body1">
            5. Наступним етапом потрібно ввести дані для відправки у віконце
          </Typography>
          <img
            src={delivery}
            alt="info-buy-screenshot"
            style={{ width: '50%' }}
          />
          <Typography variant="body1">
            6. Після того як продавець підтвердить продаж він зобов’язується
            відправити або особисто передати замовлення.
          </Typography>
          <Typography variant="body1">
            7. Всі зміни та дії ви зможете відслідковувати за допомогою статусу.
          </Typography>
          <Typography variant="body1">
            8. Коли ваше замовлення буде у вас, обовʼязково підтвердіть
            отримання.
          </Typography>
          <img src={receive} alt="receive-screenshot" />
          <Typography variant="body1">
            9. Після чого вам буде запропоновано залишити відгук про продавця.
          </Typography>
          <img src={feedback} alt="feedback-screenshot" />
        </Stack>
      </Stack>
    </Container>
  );
};

export default HowToBuy;
