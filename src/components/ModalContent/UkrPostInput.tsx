import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormControl, Stack, TextField } from '@mui/material';
import { StyledLabel } from './style';
import { CreateOrderInput } from 'src/types';

interface InputProps {
  control: Control<CreateOrderInput>;
  errors: FieldErrors<CreateOrderInput>;
  loading?: boolean;
}

const UkrPostInput: React.FC<InputProps> = ({ control, errors }) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={3}>
        <FormControl>
          <StyledLabel required>Населений пункт</StyledLabel>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <TextField
                id="city"
                placeholder="Введіть місто"
                sx={{ width: '20.5rem' }}
                size="small"
                {...field}
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <StyledLabel required>Індекс</StyledLabel>
          <Controller
            control={control}
            name="postCode"
            render={({ field }) => (
              <TextField
                placeholder="Введіть поштовий індекс"
                sx={{ width: '20.5rem' }}
                id="postCode"
                size="small"
                {...field}
                error={Boolean(errors.postCode)}
                helperText={errors.postCode?.message}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
              />
            )}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" gap={2}>
        <FormControl>
          <StyledLabel>Вулиця</StyledLabel>
          <Controller
            control={control}
            name="street"
            render={({ field }) => (
              <TextField
                id="street"
                sx={{ width: '18.5rem' }}
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <StyledLabel>Номер будинку</StyledLabel>
          <Controller
            control={control}
            name="house"
            render={({ field }) => (
              <TextField
                sx={{ width: '11rem' }}
                id="house"
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <StyledLabel>№ квартири</StyledLabel>
          <Controller
            control={control}
            name="flat"
            render={({ field }) => (
              <TextField
                sx={{ width: '11rem' }}
                id="flat"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                {...field}
              />
            )}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default UkrPostInput;
