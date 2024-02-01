import { Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const SkeletonAds: React.FC<{ limit: number }> = ({ limit }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const isLgScreen = useMediaQuery(theme.breakpoints.only('lg'));
  return (
    <>
      {Array.from(Array(limit).keys()).map((item, index) => {
        return (
          <Stack key={index} gap={3} p={3} direction="row">
            <Skeleton
              animation="wave"
              variant="rounded"
              sx={{ height: '7rem', width: '7.5rem' }}
            />
            <Stack gap={2}>
              <Skeleton
                animation="wave"
                sx={{
                  height: '1.5rem',
                  width: { lg: '32rem', md: '20rem', sm: '15rem', xs: '5rem' },
                }}
                variant="rounded"
              />
              <Skeleton
                animation="wave"
                sx={{
                  height: '1.5rem',
                  width: { lg: '32rem', md: '20rem', sm: '15rem', xs: '5rem' },
                }}
                variant="rounded"
              />
              <Skeleton
                animation="wave"
                sx={{ height: '1.5rem', width: '5rem' }}
                variant="rounded"
              />
            </Stack>
            {isLgScreen && (
              <Stack gap={1} ml={3}>
                <Skeleton
                  animation="wave"
                  sx={{ height: '3rem', width: '13rem' }}
                  variant="rounded"
                />
              </Stack>
            )}
          </Stack>
        );
      })}
    </>
  );
};

export default SkeletonAds;
