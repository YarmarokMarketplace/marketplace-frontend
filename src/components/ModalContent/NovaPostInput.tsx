import { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import React from 'react';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import { StyledLabel, StyledTab, StyledTabContainer } from './style';

export interface InputProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  loading?: boolean;
}

interface TabPanelProps {
  children?: React.ReactNode;
  type: string;
  value: string;
}

const CustomTabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, type, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== type}
      id={`tab-${type}`}
      aria-labelledby={`tab-${type}`}
      {...other}
    >
      {value === type && <>{children}</>}
    </div>
  );
};

const NovaPostInput: React.FC<InputProps> = ({ control }) => {
  const [value, setValue] = React.useState<string>('department');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Stack gap={3}>
      <StyledTabContainer
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        <StyledTab id="department" label="Відділення" value="department" />
        <StyledTab id="adress " label="Адреса" value="adress" />
        <StyledTab id="postOffice" label="Поштомат" value="postOffice" />
      </StyledTabContainer>

      <CustomTabPanel value={value} type="department">
        <Stack direction="row" gap={3}>
          <FormControl>
            <StyledLabel required>Номер поштового відділення</StyledLabel>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <TextField
                  id="department"
                  placeholder="Введіть номер поштового відділення"
                  sx={{ width: '20.5rem' }}
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <StyledLabel required>Населений пункт</StyledLabel>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <TextField
                  placeholder="Введіть місто"
                  sx={{ width: '20.5rem' }}
                  id="city"
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={value} type="adress">
        <Stack gap={2}>
          <Typography variant="body1" fontWeight={700}>
            Адреса
          </Typography>
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
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <StyledLabel required>Вулиця</StyledLabel>
              <Controller
                control={control}
                name="street"
                render={({ field }) => (
                  <TextField
                    placeholder="Обовʼязково"
                    sx={{ width: '20.5rem' }}
                    id="street"
                    size="small"
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Stack>
          <Stack direction="row" gap={3}>
            <FormControl>
              <StyledLabel required>Будинок</StyledLabel>
              <Controller
                control={control}
                name="house"
                render={({ field }) => (
                  <TextField
                    id="house"
                    placeholder="Обовʼязково"
                    sx={{ width: '20.5rem' }}
                    size="small"
                    {...field}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <StyledLabel required>Квартира</StyledLabel>
              <Controller
                control={control}
                name="flat"
                render={({ field }) => (
                  <TextField
                    placeholder="Обовʼязково"
                    sx={{ width: '20.5rem' }}
                    id="flat"
                    size="small"
                    {...field}
                  />
                )}
              />
            </FormControl>
          </Stack>
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={value} type="postOffice">
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
                />
              )}
            />
          </FormControl>
          <FormControl>
            <StyledLabel required>Номер поштомату</StyledLabel>
            <Controller
              control={control}
              name="postOffice"
              render={({ field }) => (
                <TextField
                  placeholder="Введіть номер поштомату"
                  sx={{ width: '20.5rem' }}
                  id="postOffice"
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
        </Stack>
      </CustomTabPanel>
    </Stack>
  );
};

export default NovaPostInput;
