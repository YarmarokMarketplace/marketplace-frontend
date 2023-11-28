import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export const InfoBlock = () => {
  return (
    <Stack spacing={3} padding={{ sm: '24px 80px', md: 0 }}>
      <Box>
        <Typography variant="h6" fontWeight={700}>
          Як сфотографувати товар?
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          Зробіть до 6 простих фотографій на телефон з різних ракурсів у
          звичайній обстановці. Для покупців важливіше не краса фото, а стан
          реальних речей.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={700}>
          Яку ціну поставити?
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          В середньому, при продажу з рук ставлять ціну зі знижкою від 20-50%
          від вартості нового товару залежно від його стану
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={700}>
          Як описати товар?
        </Typography>
        <Typography variant="caption" fontWeight={400}>
          Напишіть причину продажу товару, як і скільки ним користувались.
          Розкажіть про свої враження і рекомендації майбутньому власнику.
        </Typography>
      </Box>
    </Stack>
  );
};
