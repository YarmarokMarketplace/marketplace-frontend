import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import google from '../../img/logo_google.svg';
import { AppDispatch } from 'src/store';
import { useDispatch } from 'react-redux';
import { DrawerContent } from 'src/types';
import { setDrawerContentAction } from '../CustomDrawer/reducer';

export const SocialAuth = () => {
  const [chromeVersion, setChromeVersion] = useState<string>('');
  const [operaVersion, setOperaVersion] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();

  const { REACT_APP_API } = process.env;
  useEffect(() => {
    const userAgent: string = navigator.userAgent;
    console.log(userAgent);
    if (userAgent.indexOf('Opera') !== -1 || userAgent.indexOf('OPR') !== -1) {
      // Opera
      const version = userAgent.match(/(?:Opera|OPR)\/([0-9.]+)/)![1];
      setOperaVersion(version.split('.')[0]);
    } else if (userAgent.indexOf('Chrome') !== -1) {
      // Chrome
      const version = userAgent.match(/Chrome\/([0-9.]+)/)![1];
      setChromeVersion(version.split('.')[0]);
    }
  }, []);

  const handleGoogleAuthClick = () => {
    if (
      (Number(chromeVersion) < 113 && Number(chromeVersion) > 0) ||
      (Number(operaVersion) < 99 && Number(operaVersion) > 0)
    ) {
      dispatch(setDrawerContentAction(DrawerContent.googleAuthMessage));
    } else {
      window.open(`${REACT_APP_API}auth/google`, '_self');
    }
  };

  return (
    <Stack spacing={2} mt={2} alignItems="center">
      <Typography variant="caption">Увійдіть за допомогою:</Typography>
      <Button
        sx={{
          minWidth: '2.75rem',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.08);',
          img: { padding: 0.5 },
        }}
        onClick={handleGoogleAuthClick}
        id="google-btn"
      >
        <img src={google} alt="google-logo" />
      </Button>
    </Stack>
  );
};
