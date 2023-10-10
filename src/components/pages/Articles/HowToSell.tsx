import React from 'react';
import { Container, Stack, Typography } from '@mui/material';
import sell from '../../../img/sell.png';

const HowToSell = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Stack spacing={3}>
        <Typography variant="h4">Як продавати на Yarmarok</Typography>
        <Stack spacing={3}>
          <Typography variant="body1">
            1. Натисніть кнопку додати оголошення, заповніть всі необхідні дані
            товару, додайте фото та опублікуйте.
          </Typography>
          <Typography variant="body1">
            2. Після додавання детального опису та публікації оголошення вам
            залишиться тільки дочекатися покупців та їхніх відгуків.
          </Typography>
          <Typography variant="body1">
            3. Якщо покупець натисне кнопку “Купити”, ви отримаєте сповіщення з
            даними для відправки. Для того щоб підтвердити продаж натисніть
            кнопку “Підтвердити”, якщо з якихось причин ви не хочете продавати
            або вже продали товар поза маркетплейсу натисність “Скасувати”.
          </Typography>
          <img src={sell} alt="sell-screenshot" />
          <Typography variant="body1">
            4. Підтвердивши замовлення ви його маєте відправити чи особисто
            зустрітись з покупцем.
          </Typography>
          <Typography variant="body1">
            5. Оберіть для Вас зручний спосіб доставки, щоб продати товар, або
            домовтеся з покупцем про особисту зустріч у громадському місці.
          </Typography>
          <Typography variant="body1">
            6. Спілкуйтеся з покупцями. Відповідайте на питання покупців,
            надайте їм більше інформації про товар і домовтеся про ціну.
          </Typography>
          <Typography variant="body1">
            7.Після того як покупець отримає товар він зможе лишити відгук.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HowToSell;
