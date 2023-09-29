import React from 'react';
import { Container, Stack, Typography } from '@mui/material';

const Activities = () => {
  return (
    <Container maxWidth="xl" disableGutters>
      <Stack spacing={3}>
        <Typography variant="h4">Види діяльності</Typography>
        <Typography whiteSpace="pre-line" variant="body1">{`ВИДИ ДІЯЛЬНОСТІ

          6. Розміщення інформації про наступні види діяльності допускається при наявності відповідної ліцензії або спеціального дозволу:
          6.1. професійна діяльність на ринку цінних паперів;
          6.2. виробництво та торгівля алкогольними напоями;
          6.3. виробництво ветеринарних медикаментів та препаратів;
          6.4. медична та ветеринарна практики;
          6.5. оптова та роздрібна торгівля, виробництво лікарських засобів;
          6.6. продаж та ремонт пневматичної зброї калібру понад 4,5 мм і швидкістю польоту кулі понад 100 метрів в секунду;
          6.7. виробництво та продаж спеціальних засобів індивідуального захисту (бронежилети, бронепластини/бронеплити, каски тощо);
          6.8. діяльність, пов'язана з виробництвом піротехнічних засобів 1,2 і 3, а також Т1, Р1 класів небезпеки, і торгівля ними;
          6.9. надання послуг з виявлення закладних пристроїв і продаж приладів для виявлення закладних пристроїв, за допомогою яких здійснюється несанкціоноване втручання в роботу електрозв'язку (детектори жучків, детектори прихованих камер та інших аналогічних приладів;
          6.10. надання послуг з працевлаштування за кордоном;
          6.11. освітня діяльність (в сферах вищої, післядипломної, професійно - технічної, середньої освіти і т.п.);
          6.12. будівництво об'єктів, які за класом відповідальності належать до об'єктів з середніми і значними наслідками;
          6.13. туроператорська діяльність;
          6.14. внутрішні і міжнародні пасажироперевезення, перевезення небезпечних вантажів та відходів;
          6.15. охоронна діяльність;
          6.16. діяльність у сфері страхування.`}</Typography>
      </Stack>
    </Container>
  );
};

export default Activities;
