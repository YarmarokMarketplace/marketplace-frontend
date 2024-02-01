import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { FormControl, Stack, TextField } from '@mui/material';
import {
  DeliveryInfoContainer,
  StyledLabel,
  UkrPostInfoContainer,
} from './style';
import { CreateOrderInput } from 'src/types';

interface InputProps {
  control: Control<CreateOrderInput>;
  errors: FieldErrors<CreateOrderInput>;
  loading?: boolean;
}

const UkrPostInput: React.FC<InputProps> = ({ control, errors }) => {
  return (
    <Stack gap={2}>
      <DeliveryInfoContainer>
        <FormControl>
          <StyledLabel required>Населений пункт</StyledLabel>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <TextField
                id="city"
                placeholder="Введіть місто"
                sx={{ width: '100%' }}
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
                sx={{ width: '100%' }}
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
      </DeliveryInfoContainer>
      <UkrPostInfoContainer>
        <FormControl>
          <StyledLabel>Вулиця</StyledLabel>
          <Controller
            control={control}
            name="street"
            render={({ field }) => (
              <TextField
                id="street"
                sx={{ width: '100%' }}
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
                sx={{ width: '100%' }}
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
                sx={{ width: '100%' }}
                id="flat"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                {...field}
              />
            )}
          />
        </FormControl>
      </UkrPostInfoContainer>
    </Stack>
  );
};

export default UkrPostInput;
