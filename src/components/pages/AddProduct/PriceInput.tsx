import React from 'react';
import { Controller, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { Typography, Stack, TextField } from '@mui/material';
import { StyledFormLabel } from './style';
import { InputProps } from './utils';
import { FormDataAddAdvert } from '../../../types';

interface PriceInputProps extends InputProps {
  category: string;
  forFree: boolean;
  setValue: UseFormSetValue<FormDataAddAdvert>;
  trigger: UseFormTrigger<FormDataAddAdvert>;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  control,
  loading,
  errors,
  forFree,
  category,
  setValue,
  trigger,
}) => {
  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setValue('price', value);
    trigger('price');
  };
  return (
    <>
      <Controller
        control={control}
        name="price"
        defaultValue=""
        render={({ field: { onBlur, onChange, value } }) => (
          <Stack width="22rem">
            <StyledFormLabel>Вкажіть ціну у гривнях</StyledFormLabel>
            <TextField
              onChange={(event) => {
                onChange();
                handlePriceChange(event);
              }}
              onBlur={onBlur}
              value={value}
              error={Boolean(errors.price)}
              disabled={Boolean(category === 'for-free' || forFree || loading)}
              size="small"
            />
            <Typography
              color={errors.price ? 'error' : 'primary.main'}
              variant="subtitle2"
            >
              {errors.price?.message || 'Наприклад: 99.99'}
            </Typography>
          </Stack>
        )}
      />
    </>
  );
};
