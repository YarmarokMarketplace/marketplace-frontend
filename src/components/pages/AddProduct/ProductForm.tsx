import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  StyledForm,
  StyledFormControl,
  StyledFormLabel,
  StyledLink,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { categoryListFetch } from '../HomePage/thunk';
import { AppDispatch } from '../../../store';
import { categoriesStateSelector } from '../HomePage/selector';
import { addAdvertSchema, formatPhoneNumber } from './utils';
import { AddAdvertInput } from '../../../types';
import { addAdvertFetch } from './thunk';
import { addAdvertStateSelector } from './selector';
import { ImageInput } from './ImageInput';
import { TitleInput } from './TitleInput';
import { DescriptionInput } from './DescriptionInput';
import { CategoryInput } from './CategoryInput';
import { PriceInput } from './PriceInput';
import { LocationInput } from './LocationInput';

export const ProductForm = () => {
  const [selectedImage, setSelectedImage] = useState<File[] | []>([]);
  const { loading, error } = useSelector(addAdvertStateSelector);
  const [phone, setPhone] = useState<string>('+38');
  const [category, setCategory] = useState<string>('');
  const [forFree, setForFree] = useState<boolean>(false);
  const { categories } = useSelector(categoriesStateSelector);
  const dispatch: AppDispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm({
    resolver: yupResolver(addAdvertSchema),
    mode: 'all',
  });

  useEffect(() => {
    dispatch(categoryListFetch());
  }, []);

  useEffect(() => {
    if (category === 'for-free' || forFree) {
      setValue('price', '0');
      setValue('free', true);
      trigger('price');
      setForFree(true);
    }

    const preventDefault = (event: DragEvent) => {
      event.preventDefault();
    };
    window.addEventListener('drop', preventDefault);
    window.addEventListener('dragover', preventDefault);
    return () => {
      window.removeEventListener('drop', preventDefault);
      window.removeEventListener('dragover', preventDefault);
    };
  }, [category, forFree]);

  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = formatPhoneNumber(event.target.value);

    setPhone(value);
    setValue('contactNumber', value);
    trigger('contactNumber');
  };

  const checkGoodtype = () => {
    const index = categories.findIndex(
      (categoryItem) => categoryItem.name === category
    );
    return categories[index]?.isGoodType;
  };

  const onSubmit = (values: AddAdvertInput) => {
    const {
      price,
      title,
      description,
      category,
      contactName,
      contactNumber,
      location,
      goodtype,
    } = values;

    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('category', category);
    form.append('contactName', contactName);
    form.append('contactNumber', contactNumber);
    price && form.append('price', price);
    form.append('location', location);
    goodtype && form.append('goodtype', goodtype);
    selectedImage.length &&
      [...selectedImage].reverse().forEach((img) => form.append('photos', img));
    dispatch(addAdvertFetch(form));
  };

  return (
    <Stack alignItems="start" spacing={3} mb={8}>
      <Typography mb={3} variant="h4">
        Створити оголошення
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Фотографії</StyledFormLabel>
          <ImageInput
            control={control}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setValue={setValue}
            loading={loading}
            errors={errors}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Назва та опис</StyledFormLabel>
          <Stack spacing={3}>
            <TitleInput control={control} errors={errors} loading={loading} />
            <DescriptionInput
              control={control}
              errors={errors}
              loading={loading}
            />
          </Stack>
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Категорія</StyledFormLabel>
          <CategoryInput
            control={control}
            errors={errors}
            loading={loading}
            setCategory={setCategory}
            setForFree={setForFree}
            setValue={setValue}
            categories={categories}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Ціна</StyledFormLabel>
          <Stack alignItems="end">
            <Stack
              direction="row"
              width="47.5rem"
              spacing={3}
              alignItems={'center'}
            >
              <PriceInput
                control={control}
                errors={errors}
                loading={loading}
                setValue={setValue}
                category={category}
                forFree={forFree}
                trigger={trigger}
              />
              <StyledFormControl>
                <Controller
                  control={control}
                  name="free"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => (
                    <FormControlLabel
                      label="Безкоштовно"
                      sx={{ height: '1rem' }}
                      control={
                        <Checkbox
                          onChange={(event) => {
                            onChange(event);
                            setForFree(event.target.checked);
                          }}
                          value={value}
                          checked={value}
                          id="for-free"
                          disabled={category === 'for-free' || loading}
                        />
                      }
                    />
                  )}
                />
              </StyledFormControl>
              {checkGoodtype() && (
                <StyledFormControl>
                  <Controller
                    control={control}
                    name="goodtype"
                    defaultValue=""
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        sx={{ height: '2.5rem', flexWrap: 'unset' }}
                      >
                        <Stack direction="row">
                          <FormControlLabel
                            value="new"
                            control={<Radio disabled={loading} />}
                            label="Нове"
                            id="new"
                          />
                          <FormControlLabel
                            value="used"
                            control={<Radio disabled={loading} />}
                            label="Вживане"
                            id="used"
                          />
                        </Stack>
                        {errors.goodtype && (
                          <Typography
                            id="goodtype-error"
                            color="error"
                            variant="subtitle2"
                          >
                            {errors.goodtype?.message}
                          </Typography>
                        )}
                      </RadioGroup>
                    )}
                  />
                </StyledFormControl>
              )}
            </Stack>
          </Stack>
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Імʼя контактної особи</StyledFormLabel>
          <Controller
            control={control}
            name="contactName"
            defaultValue={''}
            render={({ field }) => (
              <Stack width="47.5rem">
                <StyledFormLabel>Імʼя</StyledFormLabel>
                <TextField
                  {...field}
                  disabled={loading}
                  size="small"
                  error={Boolean(errors.contactName)}
                />
                <Typography
                  color={errors.contactName ? 'error' : 'primary.main'}
                  variant="subtitle2"
                  id={errors.contactName ? 'contactName-error' : ''}
                >
                  {errors.contactName?.message ||
                    'Напишіть імʼя, наприклад: Андрій'}
                </Typography>
              </Stack>
            )}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Телефон</StyledFormLabel>
          <Controller
            control={control}
            name="contactNumber"
            defaultValue={phone}
            render={({ field: { onBlur, onChange } }) => (
              <Stack width="47.5rem">
                <StyledFormLabel>Номер телефону</StyledFormLabel>
                <TextField
                  onChange={(event) => {
                    onChange(event);
                    handleChangePhone(event);
                  }}
                  error={Boolean(errors.contactNumber)}
                  onBlur={onBlur}
                  value={phone}
                  disabled={loading}
                  size="small"
                />
                {errors.contactNumber && (
                  <Typography
                    id="contactNumber-error"
                    color="error"
                    variant="subtitle2"
                  >
                    {errors.contactNumber?.message}
                  </Typography>
                )}
              </Stack>
            )}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Місцезнаходження</StyledFormLabel>
          <LocationInput control={control} errors={errors} loading={loading} />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel></StyledFormLabel>
          <Controller
            control={control}
            name="agree"
            defaultValue={false}
            render={({ field }) => (
              <Stack width="47.5rem">
                <FormControlLabel
                  sx={{ width: 'fit-content', alignItems: 'center' }}
                  label={
                    <Typography
                      variant="subtitle2"
                      color={errors.agree && 'error'}
                    >
                      Я погоджуюсь з{' '}
                      <StyledLink target="_blank" to="/privacy-policy">
                        Політикою конфіденційності
                      </StyledLink>
                    </Typography>
                  }
                  control={<Checkbox disabled={loading} {...field} />}
                />
                {errors.agree && (
                  <Typography
                    id="terms-error"
                    color="error"
                    variant="subtitle2"
                  >
                    {errors.agree?.message}
                  </Typography>
                )}
              </Stack>
            )}
          />
        </StyledFormControl>
        <StyledFormControl>
          <StyledFormLabel></StyledFormLabel>
          <Stack width="47.5rem" spacing={2}>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              sx={{ width: '10.5rem' }}
              id="submit-btn"
            >
              Опублікувати
            </Button>
            {error && (
              <Typography id="response-error" color="error" variant="h6">
                На жаль сталася помилка. Спробуйте ще раз
              </Typography>
            )}
          </Stack>
        </StyledFormControl>
      </StyledForm>
    </Stack>
  );
};
