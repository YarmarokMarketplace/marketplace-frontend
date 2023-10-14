import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector } from 'react-redux';
import { productStateSelector } from '../pages/SingleProductPage/selectors';
import placeholder from '../../img/placeholder-image.png';
import {
  Stack,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  SelectChangeEvent,
  OutlinedInput,
} from '@mui/material';
import {
  StyledContainer,
  StyledForm,
  StyledImageWrapper,
  StyledLabel,
} from './style';
import { deliveryOption } from 'src/constants';
import NovaPostInput from './NovaPostInput';
import UkrPostInput from './UkrPostInput';
import { formatPhoneNumber } from '../pages/AddProduct/utils';
import { CreateOrderData, CreateOrderInput } from 'src/types';
import {
  createOrderDefaultValues,
  createOrderSchema,
  setDeliveryData,
} from './utils';

const ConfirmPurchase = () => {
  const { product } = useSelector(productStateSelector);
  const [deliveryType, setDeliveryType] = React.useState<string>('NovaPost');
  const [phone, setPhone] = useState<string>('+38');

  const [tabValue, setTabValue] = React.useState<string>('department');

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createOrderSchema),
    defaultValues: createOrderDefaultValues,
  });

  const handleDeliverySelect = (event: SelectChangeEvent<string>) => {
    setValue('deliveryType', event.target.value);
    setDeliveryType(event.target.value);
  };

  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = formatPhoneNumber(event.target.value);

    setPhone(value);
    setValue('phone', value);
    trigger('phone');
  };

  const handleTabValueChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue('novaPostType', newValue);
    setTabValue(newValue);
  };

  const onSubmit = (values: CreateOrderInput) => {
    const deliveryData = setDeliveryData(values);
    const data: CreateOrderData = {
      buyerName: values.firstName,
      buyerLastname: values.lastName,
      deliveryType: values.deliveryType,
      buyerPhone: values.phone,
      deliveryData: deliveryData,
    };
    console.log(data);
  };

  console.log(errors);

  return (
    <StyledContainer gap={3} width="42rem">
      <Typography variant="h4" fontWeight={700}>
        Дані для покупки
      </Typography>
      <Stack direction="row" gap={2}>
        <StyledImageWrapper>
          <img
            src={
              product?.notice?.photos[0]
                ? product?.notice?.photos[0]
                : placeholder
            }
          />
        </StyledImageWrapper>
        <Typography variant="h6">{product?.notice?.title}</Typography>
      </Stack>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Typography variant="h6" fontWeight={700}>
            Персональні дані
          </Typography>
          <Typography variant="subtitle2" color="text.disabled">
            Вкажіть ваші персональні дані
          </Typography>
        </Stack>
        <Stack direction="row" gap={2} mb={2}>
          <FormControl>
            <StyledLabel required>Ім'я</StyledLabel>
            <Controller
              control={control}
              name="firstName"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ width: '13.5rem' }}
                  id="firstName"
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <StyledLabel required>Прізвище</StyledLabel>
            <Controller
              control={control}
              name="lastName"
              defaultValue=""
              render={({ field }) => (
                <TextField
                  sx={{ width: '13.5rem' }}
                  id="lastName"
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <StyledLabel>По батькові</StyledLabel>
            <Controller
              control={control}
              name="patronymic"
              render={({ field }) => (
                <TextField
                  sx={{ width: '13.5rem' }}
                  id="patronymic"
                  size="small"
                  {...field}
                />
              )}
            />
          </FormControl>
        </Stack>
        <FormControl>
          <StyledLabel required>Номер телефону</StyledLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onBlur, onChange } }) => (
              <TextField
                sx={{ width: '13.5rem' }}
                id="phone"
                size="small"
                onChange={(event) => {
                  onChange(event);
                  handleChangePhone(event);
                }}
                value={phone}
              />
            )}
          />
        </FormControl>
        <Typography variant="h6" fontWeight={700}>
          Дані для відправки
        </Typography>
        <FormControl>
          <StyledLabel required>Варіант доставки</StyledLabel>
          <Controller
            control={control}
            name="deliveryType"
            render={({ field: { onBlur, onChange, value } }) => (
              <Select
                sx={{ width: '20.5rem' }}
                id="deliveryType"
                size="small"
                defaultValue="NovaPost"
                value={deliveryType}
                input={<OutlinedInput />}
                onBlur={onBlur}
                onChange={(event) => {
                  onChange(event);
                  handleDeliverySelect(event);
                }}
              >
                {deliveryOption.map((option) => {
                  return (
                    <MenuItem
                      key={option.value}
                      id={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          />
        </FormControl>
        {deliveryType === 'NovaPost' && (
          <NovaPostInput
            tabValue={tabValue}
            handleTabValueChange={handleTabValueChange}
            control={control}
            errors={errors}
          />
        )}
        {deliveryType === 'UkrPost' && (
          <UkrPostInput control={control} errors={errors} />
        )}
        <FormControl>
          {deliveryType === 'Other' && (
            <Stack gap={2}>
              <Typography variant="body1" fontWeight={700}>
                Дані для відправки
              </Typography>
              <StyledLabel>Напишіть бажаний варіант доставки</StyledLabel>
            </Stack>
          )}
          <Controller
            control={control}
            name="comment"
            render={({ field }) => (
              <TextField
                minRows={3}
                placeholder="Коментар до замовлення..."
                id="comment"
                multiline
                size="small"
                {...field}
              />
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name="saveData"
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              sx={{ width: 'fit-content', alignItems: 'center' }}
              label={
                <Typography variant="subtitle2">
                  Зберегти дані для наступних покупок
                </Typography>
              }
              control={
                <Checkbox
                  id="save-data-checkbox"
                  value={value}
                  checked={value}
                  onChange={onChange}
                />
              }
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: '8.5rem' }}
        >
          Надіслати
        </Button>
      </StyledForm>
    </StyledContainer>
  );
};

export default ConfirmPurchase;
