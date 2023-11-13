import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
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
import {
  addAdvertSchema,
  advertInitialData,
  dataURLtoBlob,
  formatPhoneNumber,
} from './utils';
import { AddAdvertInput, FormDataAddAdvert, ProductItem } from '../../../types';
import { addAdvertFetch, editAdvertFetch } from './thunk';
import { addAdvertStateSelector } from './selector';
import { ImageInput } from './ImageInput';
import { TitleInput } from './TitleInput';
import { DescriptionInput } from './DescriptionInput';
import { CategoryInput } from './CategoryInput';
import { PriceInput } from './PriceInput';
import { LocationInput } from './LocationInput';

type ProductFormProps = {
  edit?: boolean;
  product?: ProductItem;
};

export const ProductForm: React.FC<ProductFormProps> = ({ edit, product }) => {
  const { loading, error, images, data } = useSelector(addAdvertStateSelector);
  const inputValues = JSON.parse(localStorage.getItem('advertData')!);

  const [selectedImage, setSelectedImage] = useState<File[] | []>([]);
  const [phone, setPhone] = useState<string>(
    inputValues?.contactNumber || '+38'
  );
  const [category, setCategory] = useState<string>(inputValues?.category || '');
  const [forFree, setForFree] = useState<boolean>(inputValues?.free || false);
  const { categories } = useSelector(categoriesStateSelector);

  const dispatch: AppDispatch = useDispatch();
  const theme: Theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(addAdvertSchema),
    mode: 'all',
    defaultValues: edit
      ? {
          photos: '',
          title: product?.title,
          description: product?.description,
          category: product?.category,
          location: product?.location,
          price: String(product?.price),
          contactName: product?.contactName,
          contactNumber: product?.contactNumber,
          goodtype: product?.goodtype,
          free: false,
          agree: false,
        }
      : JSON.parse(localStorage.getItem('advertData')!) || advertInitialData,
  });

  useEffect(() => {
    dispatch(categoryListFetch());
    if (images.length > 0 && !edit) {
      const restoredPhotos = images.map((photoData: any) => {
        const blob = dataURLtoBlob(photoData.data); // Convert the base64-encoded data to a Blob.
        return new File([blob], photoData.name, { type: photoData.type }); // Create a File object from the Blob with the original name and type.
      });
      setSelectedImage(restoredPhotos); // Set restored images to the state
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
  }, []);

  useEffect(() => {
    if (product && edit) {
      setCategory(product.category);
      setPhone(product.contactNumber);
    }
  }, [product]);

  useEffect(() => {
    if (category === 'for-free' || forFree) {
      setValue('price', '0');
      setValue('free', true);
      trigger('price');
      setForFree(true);
    }
  }, [category, forFree]);

  const saveDataToLocalStorage = () => {
    const values = getValues();
    !edit && localStorage.setItem('advertData', JSON.stringify(values));
  };

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
    const editData: Partial<AddAdvertInput> = {
      price,
      contactName,
      title,
      description,
      category,
      contactNumber,
      location,
      goodtype,
    };
    form.append('title', title);
    form.append('description', description);
    form.append('category', category);
    form.append('contactName', contactName);
    form.append('contactNumber', contactNumber);
    price && form.append('price', price);
    form.append('location', location);
    goodtype && form.append('goodtype', goodtype);
    selectedImage.length > 0 &&
      [...selectedImage].forEach((img) => form.append('photos', img));
    if (edit) {
      dispatch(editAdvertFetch({ data: editData, id: product?._id! }));
    } else {
      dispatch(addAdvertFetch(form));
    }
  };

  return (
    <Stack alignItems="start" spacing={3} mb={{ md: 0, lg: 8 }}>
      <Typography mb={3} variant="h4">
        {edit ? 'Змінити оголошення' : 'Створити оголошення'}
      </Typography>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        onChange={saveDataToLocalStorage}
      >
        {!edit && (
          <StyledFormControl fullWidth>
            <StyledFormLabel>Фотографії</StyledFormLabel>
            <ImageInput
              control={control}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setValue={setValue}
              loading={loading}
              errors={errors}
              edit={edit}
            />
          </StyledFormControl>
        )}

        <StyledFormControl fullWidth>
          {isLgScreen && <StyledFormLabel>Назва та опис</StyledFormLabel>}
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
          {isLgScreen && <StyledFormLabel>Категорія</StyledFormLabel>}
          <CategoryInput
            control={control}
            errors={errors}
            loading={loading}
            setCategory={setCategory}
            setForFree={setForFree}
            setValue={setValue}
            getValue={getValues}
            categories={categories}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          {isLgScreen && <StyledFormLabel>Ціна</StyledFormLabel>}
          <Stack
            alignItems={{ md: 'flex-start', lg: 'end' }}
            width={{ md: '100%', lg: '47.5rem' }}
          >
            <Stack
              direction={{ md: 'column', lg: 'row' }}
              width={{ md: '100%', lg: '47.5rem' }}
              spacing={3}
              gap={2}
              alignItems={{ md: 'flex-start', lg: 'center' }}
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
              <Stack direction={'row'} alignItems={'center'}>
                <StyledFormControl>
                  <Controller
                    control={control}
                    name="free"
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
          </Stack>
        </StyledFormControl>
        <StyledFormControl fullWidth>
          {isLgScreen && (
            <StyledFormLabel sx={{ maxWidth: '12%' }}>
              Імʼя контактної особи
            </StyledFormLabel>
          )}
          <Controller
            control={control}
            name="contactName"
            render={({ field }) => (
              <Stack width={{ md: '100%', lg: '47.5rem' }}>
                <StyledFormLabel required>Імʼя</StyledFormLabel>
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
          {isLgScreen && <StyledFormLabel>Телефон</StyledFormLabel>}
          <Controller
            control={control}
            name="contactNumber"
            render={({ field: { onBlur, onChange } }) => (
              <Stack width={{ md: '100%', lg: '47.5rem' }}>
                <StyledFormLabel required>Номер телефону</StyledFormLabel>
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
          {isLgScreen && <StyledFormLabel>Місцезнаходження</StyledFormLabel>}
          <LocationInput
            getValue={getValues}
            control={control}
            errors={errors}
            loading={loading}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel></StyledFormLabel>
          <Controller
            control={control}
            name="agree"
            render={({ field: { value, onChange } }) => (
              <Stack width={{ md: '100%', lg: '47.5rem' }}>
                <FormControlLabel
                  sx={{ width: 'fit-content', alignItems: 'center' }}
                  label={
                    <Typography
                      variant="subtitle2"
                      color={errors.agree && 'error'}
                    >
                      Я погоджуюсь з{' '}
                      <StyledLink target="_blank" to="/rules/privacy-policy">
                        Політикою конфіденційності
                      </StyledLink>
                    </Typography>
                  }
                  control={
                    <Checkbox
                      disabled={loading}
                      value={value}
                      checked={value}
                      onChange={onChange}
                    />
                  }
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
          <Stack width={{ md: '100%', lg: '47.5rem' }} spacing={2}>
            <Button
              disabled={loading}
              type="submit"
              variant="contained"
              sx={{ width: { md: '100%', lg: '11.5rem' } }}
              id="submit-btn"
            >
              {edit ? 'Зберегти зміни' : 'Опублікувати'}
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
