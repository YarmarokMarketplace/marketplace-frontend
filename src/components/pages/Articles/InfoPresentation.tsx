import React from 'react';
import { StyledContainer } from './style';
import { Stack, Typography } from '@mui/material';
import { Content } from './Content';

const InfoPresentation = () => {
  return (
    <StyledContainer maxWidth="xl" disableGutters>
      <Stack spacing={3}>
        <Typography variant="h4">Подача інформації</Typography>
        <Typography whiteSpace="pre-line" variant="body1">{`ПОДАЧА ІНФОРМАЦІЇ

          2.1. Товарні позиції повинні бути оформлені відповідно до вимог Правил оформлення товарних позицій.
          
          2.2. Адміністрація маркетплейсу має право не публікувати в каталозі інформацію про товари/послуги у разі, якщо:
          2.2.1. назва або опис позиції містить безглуздий набір символів або набір ключових слів;
          2.2.2. в інформації містяться посилання на зовнішні сайти, за винятком посилань на відеоогляди і сайти логістичних компаній;
          2.2.3. в інформації містяться будь-які елементи (код), які змінюють зовнішній вигляд сторінки товару/послуги на маркетплейсі та/або управляють поведінкою браузерів інших користувачів;
          2.2.4. в тексті використовуються слова, набрані ВЕЛИКИМИ літерами (за винятком абревіатур) або тексти, в яких використовується розрядка (написання слів із пробілами між буквами);
          2.2.5. в тексті є безліч граматичних, пунктуаційних або синтаксичних помилок або опис на трансліті;
          2.2.6. порушуються Правила оформлення товарних позицій;
          2.2.7. товарні позиції дублюються. Дублюванням вважаються ситуації, коли для одного товару або послуги створена більш ніж одна товарна позиція з однаковим або ідентичним зображенням (у т.ч. зображенням в різних ракурсах), назвою та/або описом, за винятком товарів з однаковими фото, але різними характеристиками та описом;
          2.2.8. оформлення товарних позицій вводить покупця в оману (ціна та наявність неактуальні; зображення та опис товару/послуги не відповідають дійсності; інформація містить суб'єктивну думку чи аргументи без підстави тощо).`}</Typography>
      </Stack>
      <Content />
    </StyledContainer>
  );
};

export default InfoPresentation;