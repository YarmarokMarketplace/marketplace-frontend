import React from 'react';
import { Controller, UseFormSetValue } from 'react-hook-form';
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import { StyledFormLabel, menuStyles } from './style';
import { CategoryItem, FormDataAddAdvert } from '../../../types';

import { InputProps } from './utils';
import { categoryNames } from '../../../constants';

interface CategoryInputProps extends InputProps {
  setCategory: (value: React.SetStateAction<string>) => void;
  setForFree: (value: React.SetStateAction<boolean>) => void;
  setValue: UseFormSetValue<FormDataAddAdvert>;
  categories: CategoryItem[];
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
  control,
  errors,
  setCategory,
  setValue,
  setForFree,
  categories,
  loading,
}) => {
  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setValue('goodtype', '');
    setValue('free', false);
    setForFree(false);
  };
  return (
    <>
      <Controller
        control={control}
        name="category"
        defaultValue=""
        render={({ field: { onBlur, onChange, value } }) => (
          <Stack width="47.5rem">
            <StyledFormLabel> Вкажіть категорію</StyledFormLabel>
            <Select
              displayEmpty
              disabled={loading}
              error={Boolean(errors.category)}
              input={<OutlinedInput />}
              id="select-category"
              onBlur={onBlur}
              value={value}
              onChange={(event) => {
                onChange(event);
                handleChangeCategory(event);
              }}
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
                Всі категорії
              </MenuItem>
              {categories.map((category) => (
                <MenuItem
                  id={category._id}
                  key={category._id}
                  value={category.name}
                >
                  {categoryNames[category.name]}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography id="category-error" color="error" variant="subtitle2">
                {errors.category?.message}
              </Typography>
            )}
          </Stack>
        )}
      />
    </>
  );
};
