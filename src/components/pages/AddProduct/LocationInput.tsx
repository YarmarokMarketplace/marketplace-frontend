import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  OutlinedInput,
} from '@mui/material';
import { locations } from '../../../constants';
import { menuStyles } from './style';
import { InputProps } from './utils';

export const LocationInput: React.FC<InputProps> = ({
  control,
  errors,
  loading,
}) => {
  return (
    <>
      <Controller
        control={control}
        name="location"
        defaultValue=""
        render={({ field }) => (
          <Stack width="47.5rem">
            <Select
              displayEmpty
              defaultValue=""
              disabled={loading}
              error={Boolean(errors.location)}
              input={<OutlinedInput />}
              id="select-location"
              {...field}
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
              <Typography color="error" variant="subtitle2">
                {errors.location?.message}
              </Typography>
            )}
          </Stack>
        )}
      />
    </>
  );
};
