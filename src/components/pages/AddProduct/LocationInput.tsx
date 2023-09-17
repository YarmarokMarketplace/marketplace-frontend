import React from 'react';
import { Controller, UseFormGetValues } from 'react-hook-form';
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import { locations } from '../../../constants';
import { StyledFormLabel, menuStyles } from './style';
import { InputProps } from './utils';
import { FormDataAddAdvert } from 'src/types';

interface LocationInputProps extends InputProps {
  getValue: UseFormGetValues<FormDataAddAdvert>;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  control,
  errors,
  loading,
  getValue,
}) => {
  const handleChangeLocation = (event: SelectChangeEvent<string>) => {
    const values = getValue();
    localStorage.setItem('advertData', JSON.stringify(values));
  };
  return (
    <>
      <Controller
        control={control}
        name="location"
        render={({ field: { onBlur, onChange, value } }) => (
          <Stack width="47.5rem">
            <StyledFormLabel required>Вкажіть локацію</StyledFormLabel>
            <Select
              displayEmpty
              disabled={loading}
              error={Boolean(errors.location)}
              input={<OutlinedInput />}
              id="select-location"
              onChange={(event) => {
                onChange(event);
                handleChangeLocation(event);
              }}
              onBlur={onBlur}
              value={value}
              MenuProps={{
                sx: {
                  '.MuiPaper-root': menuStyles,
                },
              }}
              size="small"
            >
              <MenuItem
                sx={{
                  color: 'secondary.main',
                }}
                disabled
                value=""
              >
                Виберіть місцезнаходження
              </MenuItem>
              {locations
                .filter((location) => location.value)
                .map((location) => {
                  if (location.value == 'Ukraine') {
                    return;
                  } else {
                    return (
                      <MenuItem
                        id={location.value}
                        key={location.value}
                        value={location.value}
                      >
                        {location.label}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
            {errors.location && (
              <Typography id="location-error" color="error" variant="subtitle2">
                {errors.location?.message}
              </Typography>
            )}
          </Stack>
        )}
      />
    </>
  );
};
