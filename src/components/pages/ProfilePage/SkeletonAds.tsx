import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const SkeletonAds: React.FC<{ limit: number }> = ({ limit }) => {
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
                sx={{ height: '1.5rem', width: '32rem' }}
                variant="rounded"
              />
              <Skeleton
                animation="wave"
                sx={{ height: '1.5rem', width: '32rem' }}
                variant="rounded"
              />
              <Skeleton
                animation="wave"
                sx={{ height: '1.5rem', width: '5rem' }}
                variant="rounded"
              />
            </Stack>
            <Stack gap={1} ml={3}>
              <Skeleton
                animation="wave"
                sx={{ height: '3rem', width: '13rem' }}
                variant="rounded"
              />
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};

export default SkeletonAds;
