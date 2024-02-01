import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch, useSelector } from 'react-redux';
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
  Chip,
} from '@mui/material';
import {
  PersonalInfoContainer,
  StyledContainer,
  StyledForm,
  StyledImageWrapper,
  StyledLabel,
} from './style';
import { categoriesDeliveryAbsense, deliveryOption } from 'src/constants';
import NovaPostInput from './NovaPostInput';
import UkrPostInput from './UkrPostInput';
import { formatPhoneNumber } from '../pages/AddProduct/utils';
import { CreateOrderData, CreateOrderInput } from 'src/types';
import {
  createOrderDefaultValues,
  createOrderSchema,
  setDeliveryData,
} from './utils';
import { profileStateSelector } from 'redux/profile/selector';
import { AppDispatch } from 'src/store';
import { createOrderFetch } from 'redux/profile/thunk';
import { resetOrderStateAction } from 'redux/profile/reducer';

const ConfirmPurchase = () => {
  const { product } = useSelector(productStateSelector);
  const [deliveryType, setDeliveryType] = React.useState<string>('new-post');
  const [phone, setPhone] = useState<string>('+38');
  const [tabValue, setTabValue] = React.useState<string>('department');
  const [deliveryDisabled, setDeliveryDisabled] =
    React.useState<boolean>(false);
  const {
    order: { loading, error, success },
  } = useSelector(profileStateSelector);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetOrderStateAction());
  }, []);

  useEffect(() => {
    if (
      categoriesDeliveryAbsense.some(
        (category) => category === product?.notice?.category
      )
    ) {
      setDeliveryType('other');
      setValue('deliveryType', 'other');
      setDeliveryDisabled(true);
    }
  }, [product]);

  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<CreateOrderInput>({
    resolver: yupResolver<CreateOrderInput>(createOrderSchema),
    defaultValues: createOrderDefaultValues,
    mode: 'onChange',
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
    trigger();
  };

  const onSubmit = (values: CreateOrderInput) => {
    const deliveryData = setDeliveryData(values);
    const data: CreateOrderData = {
      buyerName: values.firstName,
      buyerLastname: values.lastName,
      buyerPatronymic: values.patronymic,
      deliveryType: values.deliveryType,
      buyerPhone: values.phone,
      deliveryData: deliveryData,
      saveData: values.saveData,
    };
    dispatch(createOrderFetch({ id: product?.notice?._id!, data }));
  };

  return (
    <StyledContainer gap={3} width={{ sm: '100%', md: '42rem' }}>
      {success ? (
        <Typography textAlign="center" variant="h4">
          Дякуємо за покупку! Ваше замовлення прийнято в обробку. Слідкуйте за
          статусом вашого замовлення у особистому кабінеті.
        </Typography>
      ) : (
        <>
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
            <Stack gap={2}>
              <Typography variant="h6">{product?.notice?.title}</Typography>
              <Chip
                label={`${product?.notice?.price} грн`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  width: 'fit-content',
                }}
              />
            </Stack>
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
            <PersonalInfoContainer>
              <FormControl>
                <StyledLabel required>Ім'я</StyledLabel>
                <Controller
                  control={control}
                  name="firstName"
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      sx={{ width: '100%' }}
                      id="firstName"
                      size="small"
                      disabled={loading}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName?.message}
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
                      sx={{ width: '100%' }}
                      id="lastName"
                      size="small"
                      disabled={loading}
                      {...field}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
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
                      sx={{ width: '100%' }}
                      id="patronymic"
                      size="small"
                      disabled={loading}
                      {...field}
                    />
                  )}
                />
              </FormControl>
            </PersonalInfoContainer>
            <FormControl>
              <StyledLabel required>Номер телефону</StyledLabel>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onBlur, onChange } }) => (
                  <TextField
                    sx={{ width: { sm: '100%', md: '13.5rem' } }}
                    id="phone"
                    size="small"
                    disabled={loading}
                    onChange={(event) => {
                      onChange(event);
                      handleChangePhone(event);
                    }}
                    value={phone}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
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
                    sx={{ width: { sm: '100%', md: '50%' } }}
                    id="deliveryType"
                    size="small"
                    disabled={loading || deliveryDisabled}
                    value={deliveryType}
                    input={<OutlinedInput />}
                    onBlur={onBlur}
                    onChange={(event) => {
                      onChange(event);
                      handleDeliverySelect(event);
                    }}
                    error={Boolean(errors.deliveryType)}
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
              {errors.deliveryType && (
                <Typography
                  id="deliveryType-error"
                  color="error"
                  variant="subtitle2"
                >
                  {errors.deliveryType?.message}
                </Typography>
              )}
            </FormControl>
            {deliveryType === 'new-post' && (
              <NovaPostInput
                tabValue={tabValue}
                handleTabValueChange={handleTabValueChange}
                control={control}
                errors={errors}
                loading={loading}
              />
            )}
            {deliveryType === 'ukr-post' && (
              <UkrPostInput
                control={control}
                errors={errors}
                loading={loading}
              />
            )}
            <FormControl>
              {deliveryType === 'other' && (
                <StyledLabel required={deliveryType === 'other'}>
                  Напишіть бажаний варіант
                </StyledLabel>
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
                    disabled={loading}
                    error={Boolean(errors.comment)}
                    helperText={errors.comment?.message}
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
                      disabled={loading}
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
              id="create-order-btn"
              sx={{ width: '8.5rem' }}
              disabled={loading || !isValid}
            >
              Надіслати
            </Button>
            {error && (
              <Typography id="response-error" color="error" variant="h6">
                На жаль сталася помилка. Спробуйте ще раз
              </Typography>
            )}
          </StyledForm>
        </>
      )}
    </StyledContainer>
  );
};

export default ConfirmPurchase;
