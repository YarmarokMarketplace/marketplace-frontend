import { Stack, Typography } from '@mui/material';
import React from 'react';

const GoogleAuthMessage = () => {
  return (
    <Stack mt={3} spacing={4} alignItems="center" textAlign="center">
      <Typography color="info.main" fontWeight={500} variant="h5">
        Ваш браузер застарів
      </Typography>
      <Stack spacing={2} textAlign="center">
        <Typography color="primary.dark">
          У старих версіях браузеру наш сервіс може працювати неправильно.
        </Typography>
        <Typography color="primary.dark">
          Щоб продовжити користуватися Yarmarok оновіть ваш браузер або
          скористайтеся стандартною формою реєстрації
        </Typography>
      </Stack>
    </Stack>
  );
};

export default GoogleAuthMessage;
