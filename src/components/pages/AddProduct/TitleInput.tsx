import React from 'react';
import { Controller } from 'react-hook-form';
import { Typography, Stack, TextField } from '@mui/material';
import { StyledFormLabel } from './style';
import { InputProps } from './utils';

export const TitleInput: React.FC<InputProps> = ({
  control,
  errors,
  loading,
}) => {
  return (
    <>
      <Controller
        control={control}
        name="title"
        defaultValue=""
        render={({ field }) => (
          <Stack width="47.5rem">
            <StyledFormLabel required> Назва</StyledFormLabel>
            <TextField
              error={Boolean(errors.title)}
              {...field}
              disabled={loading}
              size="small"
            />
            <Typography
              color={errors.title ? 'error' : 'primary.main'}
              id={errors.title ? 'title-error' : ''}
              variant="subtitle2"
            >
              {errors.title?.message || 'Напишіть назву оголошення'}
            </Typography>
          </Stack>
        )}
      />
    </>
  );
};
