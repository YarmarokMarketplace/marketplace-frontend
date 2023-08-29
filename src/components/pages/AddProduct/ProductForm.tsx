import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  StyledFileInput,
  StyledFileLable,
  StyledForm,
  StyledFormControl,
  StyledFormLabel,
  StyledLink,
  StyledPreview,
  StyledUploadButton,
  menuStyles,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { categoryListFetch } from '../HomePage/thunk';
import { AppDispatch } from '../../../store';
import { categoriesStateSelector } from '../HomePage/selector';
import { categoryNames, locations } from '../../../constants';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { addAdvertSchema, formatPhoneNumber } from './utils';
import { AddAdvertInput } from '../../../types';
import { addAdvertFetch } from './thunk';
import { addAdvertStateSelector } from './selector';

export const ProductForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File[] | []>([]);
  const { loading, error } = useSelector(addAdvertStateSelector);
  const [description, setDesc] = useState<string>('');
  const [phone, setPhone] = useState<string>('+38');
  const [category, setCategory] = useState<string>('');
  const [forFree, setForFree] = useState<boolean>(false);
  const [imgQuantityError, setImgQuantityError] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { categories } = useSelector(categoriesStateSelector);
  const dispatch: AppDispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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

  const handleSelectedImageSaving = (files: File[]) => {
    setSelectedImage((prevState) => {
      if (
        prevState.some((img) => files.some((file) => file.name == img.name))
      ) {
        const prev = prevState.filter(
          (img) => !files.some((file) => file.name == img.name)
        );
        const updated = [...files, ...prev];
        if (updated.length > 6) {
          setImgQuantityError(true);
          return prevState;
        }
        return updated;
      }
      const updated = [...files, ...prevState];
      if (updated.length > 6) {
        setImgQuantityError(true);
        return prevState;
      }
      setImgQuantityError(false);
      return updated;
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      handleSelectedImageSaving(files);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const files = Array.from(event.dataTransfer.files);
      handleSelectedImageSaving(files);
    }
    setDragActive(false);
  };

  const handleImageDelete = (target: File) => {
    setSelectedImage((prevState) => {
      return prevState.filter((img) => img.name !== target.name);
    });
  };

  const handleImageRotate = (target: File) => {
    const image = document.getElementById(target.name) as HTMLImageElement;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (image && context) {
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(90 * (Math.PI / 180)); // Convert degrees to radians
      context.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    }
    canvas.toBlob((blob) => {
      if (blob) {
        const rotatedFile = new File([blob], `${target.name}_rotated.jpg`, {
          type: target.type,
          lastModified: Date.now(),
        });
        setSelectedImage((prevState) => {
          return prevState.map((file) => {
            if (file == target) {
              return rotatedFile;
            } else {
              return file;
            }
          });
        });
      }
    }, target.type);
  };

  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = formatPhoneNumber(event.target.value);

    setPhone(value);
    setValue('contactNumber', value);
    trigger('contactNumber');
  };

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value.replace(/[^0-9.]/g, '');
    setValue('price', value);
    trigger('price');
  };

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
    setValue('goodtype', '');
    setValue('free', false);
    setForFree(false);
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
      selectedImage.reverse().forEach((img) => form.append('photos', img));

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
          <Controller
            control={control}
            name="photos"
            defaultValue=""
            render={({ field: { onBlur, onChange, value } }) => (
              <Stack width="47.5rem">
                <StyledFileInput
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={() => setDragActive(false)}
                  sx={{
                    justifyContent: selectedImage.length ? 'start' : 'center',
                    position: 'relative',
                    borderColor: imgQuantityError
                      ? 'error.main'
                      : 'secondary.light',
                    backgroundColor: dragActive ? 'primary.contrastText' : '',
                  }}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      onChange(event);
                      handleImageUpload(event);
                    }}
                    onClick={() => setValue('photos', '')}
                    onBlur={onBlur}
                    value={value}
                  />
                  <StyledFileLable
                    sx={{
                      width: `calc(100% - ${selectedImage.length} * (6.5rem + 16px))`,
                      display: selectedImage.length < 6 ? '' : 'none',
                      border: selectedImage.length ? '1px solid #D4D7DF' : '',
                    }}
                    htmlFor="upload-photo"
                  >
                    <StyledUploadButton
                      id="upload-photo-btn"
                      onClick={() => fileRef.current?.click()}
                      disabled={loading}
                    />
                  </StyledFileLable>

                  {selectedImage.length > 0 &&
                    selectedImage.map((img) => {
                      return (
                        <Stack
                          key={img.name}
                          width="6.5rem"
                          height="7.3rem"
                          position="relative"
                          overflow="hidden"
                          borderRadius={1.5}
                        >
                          <StyledPreview
                            id={img.name}
                            src={URL.createObjectURL(img)}
                          />
                          <Stack
                            width="100%"
                            direction="row"
                            justifyContent="space-between"
                            position="absolute"
                            bottom={0}
                            left={0}
                          >
                            <IconButton onClick={() => handleImageRotate(img)}>
                              <RefreshOutlinedIcon
                                sx={{
                                  color: 'white',
                                  backgroundColor: '#00000033',
                                  borderRadius: '50%',
                                  ':hover': {
                                    backgroundColor: 'secondary.dark',
                                  },
                                }}
                                fontSize="small"
                              />
                            </IconButton>
                            <IconButton
                              color="secondary"
                              onClick={() => handleImageDelete(img)}
                            >
                              <DeleteOutlineOutlinedIcon
                                sx={{
                                  color: 'white',
                                  backgroundColor: '#00000033',
                                  borderRadius: '50%',
                                  ':hover': {
                                    backgroundColor: 'secondary.dark',
                                  },
                                }}
                                fontSize="small"
                              />
                            </IconButton>
                          </Stack>
                        </Stack>
                      );
                    })}
                  <Typography
                    sx={{ position: 'absolute', bottom: 2, right: '48.5%' }}
                    color="secondary.dark"
                    variant="caption"
                  >
                    {selectedImage.length} з 6
                  </Typography>
                </StyledFileInput>
                <Typography
                  color={imgQuantityError ? 'error' : 'primary.main'}
                  variant="subtitle2"
                >
                  {imgQuantityError
                    ? 'Ви не можете завантажити більше 6 фото'
                    : 'Перше фото - обкладинка. Оберіть найкраще фото для вашого товару.'}
                </Typography>
              </Stack>
            )}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Назва та опис</StyledFormLabel>
          <Stack spacing={3}>
            <Controller
              control={control}
              name="title"
              defaultValue=""
              render={({ field }) => (
                <Stack width="47.5rem">
                  <StyledFormLabel> Назва</StyledFormLabel>
                  <TextField
                    error={Boolean(errors.title)}
                    {...field}
                    disabled={loading}
                    InputProps={{
                      endAdornment: errors.title && (
                        <InfoOutlinedIcon
                          color="error"
                          sx={{ fontSize: '1rem' }}
                        />
                      ),
                    }}
                    size="small"
                  />
                  <Typography
                    color={errors.title ? 'error' : 'primary.main'}
                    variant="subtitle2"
                  >
                    {errors.title?.message || 'Напишіть назву оголошення'}
                  </Typography>
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="description"
              defaultValue=""
              render={({ field: { onBlur, onChange, value } }) => (
                <Stack width="47.5rem">
                  <StyledFormLabel>Опис</StyledFormLabel>
                  <TextField
                    multiline
                    minRows={2}
                    disabled={loading}
                    onChange={(event) => {
                      onChange(event);
                      setDesc(event.target.value);
                    }}
                    onBlur={onBlur}
                    error={Boolean(errors.description)}
                    InputProps={{
                      endAdornment: errors.description && (
                        <InfoOutlinedIcon
                          color="error"
                          sx={{ fontSize: '1rem' }}
                        />
                      ),
                    }}
                    value={value}
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      color={errors.description ? 'error' : 'primary.main'}
                      variant="subtitle2"
                    >
                      {errors.description?.message || 'Додайте опис'}
                    </Typography>
                    <Typography
                      color={errors.description ? 'error' : 'primary.main'}
                      variant="subtitle2"
                    >
                      {`${description.length} / 1000`}
                    </Typography>
                  </Stack>
                </Stack>
              )}
            />
          </Stack>
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Категорія</StyledFormLabel>
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
                  endAdornment={
                    errors.category && (
                      <InfoOutlinedIcon
                        color="error"
                        sx={{ fontSize: '1rem', marginRight: 2 }}
                      />
                    )
                  }
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
                  <Typography color="error" variant="subtitle2">
                    {errors.category?.message}
                  </Typography>
                )}
              </Stack>
            )}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Ціна</StyledFormLabel>
          <Stack direction="row" width="47.5rem" spacing={3}>
            <Controller
              control={control}
              name="price"
              defaultValue=""
              render={({ field: { onBlur, onChange, value } }) => (
                <Stack width="22rem">
                  <StyledFormLabel>Вкажіть ціну у гривнях</StyledFormLabel>
                  <TextField
                    onChange={(event) => {
                      onChange();
                      handlePriceChange(event);
                    }}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors.price)}
                    InputProps={{
                      endAdornment: errors.price && (
                        <InfoOutlinedIcon
                          color="error"
                          sx={{ fontSize: '1rem' }}
                        />
                      ),
                    }}
                    disabled={category === 'for-free' || forFree || loading}
                    size="small"
                  />
                  <Typography
                    color={errors.price ? 'error' : 'primary.main'}
                    variant="subtitle2"
                  >
                    {errors.price?.message || 'Наприклад: 99.99'}
                  </Typography>
                </Stack>
              )}
            />
            <StyledFormControl>
              <Controller
                control={control}
                name="free"
                defaultValue={false}
                render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                    label="Безкоштовно"
                    control={
                      <Checkbox
                        onChange={(event) => {
                          onChange(event);
                          setForFree(event.target.checked);
                        }}
                        value={value}
                        checked={value}
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
                    <RadioGroup row {...field}>
                      <FormControlLabel
                        value="new"
                        control={<Radio disabled={loading} />}
                        label="Нове"
                      />
                      <FormControlLabel
                        value="used"
                        control={<Radio disabled={loading} />}
                        label="Вживане"
                      />
                    </RadioGroup>
                  )}
                />
                {errors.goodtype && (
                  <Typography color="error" variant="subtitle2">
                    {errors.goodtype?.message}
                  </Typography>
                )}
              </StyledFormControl>
            )}
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
                  InputProps={{
                    endAdornment: errors.contactName && (
                      <InfoOutlinedIcon
                        color="error"
                        sx={{ fontSize: '1rem' }}
                      />
                    ),
                  }}
                  error={Boolean(errors.contactName)}
                />
                <Typography
                  color={errors.contactName ? 'error' : 'primary.main'}
                  variant="subtitle2"
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
                  InputProps={{
                    endAdornment: errors.contactNumber && (
                      <InfoOutlinedIcon
                        color="error"
                        sx={{ fontSize: '1rem' }}
                      />
                    ),
                  }}
                  error={Boolean(errors.contactNumber)}
                  onBlur={onBlur}
                  value={phone}
                  disabled={loading}
                  size="small"
                />
                {errors.contactNumber && (
                  <Typography color="error" variant="subtitle2">
                    {errors.contactNumber?.message}
                  </Typography>
                )}
              </Stack>
            )}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Місцезнаходження</StyledFormLabel>
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
                  endAdornment={
                    errors.location && (
                      <InfoOutlinedIcon
                        color="error"
                        sx={{ fontSize: '1rem', marginRight: 2 }}
                      />
                    )
                  }
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
                  <Typography color="error" variant="subtitle2">
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
              disabled={!isValid || loading}
              type="submit"
              variant="contained"
              sx={{ width: '10.5rem' }}
            >
              Опублікувати
            </Button>
            {error && (
              <Typography color="error" variant="h6">
                На жаль сталася помилка. Спробуйте ще раз
              </Typography>
            )}
          </Stack>
        </StyledFormControl>
      </StyledForm>
    </Stack>
  );
};
