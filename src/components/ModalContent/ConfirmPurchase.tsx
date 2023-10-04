import React from 'react';

import { useForm, Controller } from 'react-hook-form';
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

const ConfirmPurchase = () => {
  const { product } = useSelector(productStateSelector);
  const [deliveryType, setDeliveryType] = React.useState<string>('NovaPost');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDeliverySelect = (event: SelectChangeEvent<string>) => {
    setDeliveryType(event.target.value);
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <StyledContainer gap={3} width="42rem">
      <Typography variant="h4" fontWeight={700}>
        Дані для покупки
      </Typography>
      <Stack direction="row" gap={2}>
        <StyledImageWrapper>
          <img src={product?.photos[0] ? product?.photos[0] : placeholder} />
        </StyledImageWrapper>
        <Typography variant="h6">{product?.title}</Typography>
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
            render={({ field }) => (
              <TextField
                sx={{ width: '13.5rem' }}
                id="phone"
                size="small"
                {...field}
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
          <NovaPostInput control={control} errors={errors} />
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
