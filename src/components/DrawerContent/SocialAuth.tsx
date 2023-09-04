import React from 'react';
import { Button, IconButton, Stack, Typography, Link } from '@mui/material';
import google from '../../img/logo_google.svg';
import { GoogleButton } from './style';

export const SocialAuth = () => {
  const { REACT_APP_API } = process.env;
  const href = `${REACT_APP_API}auth/google`;
  return (
    <Stack spacing={2} mt={2} alignItems="center">
      <Typography variant="caption">Увійдіть за допомогою:</Typography>
      <Button
        sx={{
          minWidth: '2.75rem',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08);',
          img: { padding: 0.5 },
        }}
        href={href}
        data-scope="email profile"
        component={Link}
      >
        <img src={google} alt="google-logo" />
      </Button>
    </Stack>
  );
};
