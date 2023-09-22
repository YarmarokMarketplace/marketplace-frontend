import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Typography, Stack, TextField } from '@mui/material';
import { StyledFormLabel } from './style';
import { InputProps } from './utils';

export const DescriptionInput: React.FC<InputProps> = ({
  control,
  errors,
  loading,
}) => {
  const [description, setDesc] = useState<string>('');

  return (
    <>
      <Controller
        control={control}
        name="description"
        render={({ field: { onBlur, onChange, value } }) => (
          <Stack width="47.5rem">
            <StyledFormLabel required>Опис</StyledFormLabel>
            <TextField
              multiline
              minRows={2}
              disabled={loading}
              onChange={(event) => {
                onChange(event);
                setDesc(event.target.value);
              }}
              onBlur={onBlur}
              error={Boolean(errors.description)}
              value={value}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography
                color={errors.description ? 'error' : 'primary.main'}
                variant="subtitle2"
                id={errors.description ? 'description-error' : ''}
              >
                {errors.description?.message || 'Додайте опис'}
              </Typography>
              <Typography
                color={errors.description ? 'error' : 'primary.main'}
                variant="subtitle2"
                id={errors.description ? 'length-error' : ''}
              >
                {`${description.length} / 1000`}
              </Typography>
            </Stack>
          </Stack>
        )}
      />
    </>
  );
};
