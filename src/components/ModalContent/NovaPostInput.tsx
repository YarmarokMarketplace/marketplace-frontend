import React from 'react';
import { Control, FieldErrors, Controller } from 'react-hook-form';
import { FormControl, Stack, TextField, Typography } from '@mui/material';
import {
  DeliveryInfoContainer,
  StyledLabel,
  StyledTab,
  StyledTabContainer,
} from './style';
import { CreateOrderInput } from 'src/types';

export interface InputProps {
  control: Control<CreateOrderInput>;
  errors: FieldErrors<CreateOrderInput>;
  loading?: boolean;
  tabValue: string;
  handleTabValueChange: (event: React.SyntheticEvent, newValue: string) => void;
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

const NovaPostInput: React.FC<InputProps> = ({
  control,
  tabValue,
  handleTabValueChange,
  errors,
}) => {
  return (
    <Stack gap={3}>
      <Controller
        control={control}
        name="novaPostType"
        render={() => (
          <StyledTabContainer
            value={tabValue}
            onChange={handleTabValueChange}
            variant="fullWidth"
          >
            <StyledTab id="department" label="Відділення" value="department" />
            <StyledTab id="address " label="Адреса" value="address" />
            <StyledTab id="postOffice" label="Поштомат" value="postOffice" />
          </StyledTabContainer>
        )}
      />

      <CustomTabPanel value={tabValue} type="department">
        <DeliveryInfoContainer>
          <FormControl>
            <StyledLabel required>Номер поштового відділення</StyledLabel>
            <Controller
              defaultValue=""
              control={control}
              name="department"
              render={({ field }) => (
                <TextField
                  id="department"
                  placeholder="Введіть номер поштового відділення"
                  sx={{ width: '100%' }}
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  {...field}
                  error={Boolean(errors.department)}
                  helperText={errors.department?.message}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <StyledLabel required>Населений пункт</StyledLabel>
            <Controller
              control={control}
              defaultValue=""
              name="city"
              render={({ field }) => (
                <TextField
                  placeholder="Введіть місто"
                  sx={{ width: '100%' }}
                  id="city"
                  size="small"
                  {...field}
                  error={Boolean(errors.city)}
                  helperText={errors.city?.message}
                />
              )}
            />
          </FormControl>
        </DeliveryInfoContainer>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} type="address">
        <Stack gap={2}>
          <Typography variant="body1" fontWeight={700}>
            Адреса
          </Typography>
          <DeliveryInfoContainer>
            <FormControl>
              <StyledLabel required>Населений пункт</StyledLabel>
              <Controller
                control={control}
                name="city"
                defaultValue=""
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
              <StyledLabel required>Вулиця</StyledLabel>
              <Controller
                control={control}
                name="street"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    placeholder="Обовʼязково"
                    sx={{ width: '100%' }}
                    id="street"
                    size="small"
                    {...field}
                    error={Boolean(errors.street)}
                    helperText={errors.street?.message}
                  />
                )}
              />
            </FormControl>
          </DeliveryInfoContainer>
          <DeliveryInfoContainer>
            <FormControl>
              <StyledLabel required>Будинок</StyledLabel>
              <Controller
                control={control}
                name="house"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    id="house"
                    placeholder="Обовʼязково"
                    sx={{ width: '100%' }}
                    size="small"
                    {...field}
                    error={Boolean(errors.house)}
                    helperText={errors.house?.message}
                  />
                )}
              />
            </FormControl>
            <FormControl>
              <StyledLabel required>Квартира</StyledLabel>
              <Controller
                control={control}
                name="flat"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    placeholder="Обовʼязково"
                    sx={{ width: '100%' }}
                    id="flat"
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    {...field}
                    error={Boolean(errors.flat)}
                    helperText={errors.flat?.message}
                  />
                )}
              />
            </FormControl>
          </DeliveryInfoContainer>
        </Stack>
      </CustomTabPanel>

      <CustomTabPanel value={tabValue} type="postOffice">
        <DeliveryInfoContainer>
          <FormControl>
            <StyledLabel required>Населений пункт</StyledLabel>
            <Controller
              control={control}
              name="city"
              defaultValue=""
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
            <StyledLabel required>Номер поштомату</StyledLabel>
            <Controller
              control={control}
              name="postOffice"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  placeholder="Введіть номер поштомату"
                  sx={{ width: '100%' }}
                  id="postOffice"
                  size="small"
                  {...field}
                  error={Boolean(errors.postOffice)}
                  helperText={errors.postOffice?.message}
                />
              )}
            />
          </FormControl>
        </DeliveryInfoContainer>
      </CustomTabPanel>
    </Stack>
  );
};

export default NovaPostInput;
