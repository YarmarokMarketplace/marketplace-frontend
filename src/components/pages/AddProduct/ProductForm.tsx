import React, { useEffect, useRef, useState } from "react";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  StyledFileInput,
  StyledFileLable,
  StyledFormControl,
  StyledFormLabel,
  StyledPreview,
  menuStyles,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { categoryListFetch } from "../HomePage/thunk";
import { AppDispatch } from "../../../store";
import { categoriesStateSelector } from "../HomePage/selector";
import { categoryNames } from "../../../constants";

import upload from "../../../img/upload-file.png";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

export const ProductForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File[] | []>([]);
  const [desc, setDesc] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector(categoriesStateSelector);

  useEffect(() => {
    dispatch(categoryListFetch());
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    trigger,
    reset,
  } = useForm({});
  console.log(selectedImage);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage([event.target.files[0], ...selectedImage]);
    }
  };

  const handleImageDelete = (target: File) => {
    setSelectedImage(selectedImage.filter((img) => img !== target));
  };

  const handleImageRotate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    target: File
  ) => {};

  return (
    <Stack alignItems="start" spacing={3}>
      <Typography mb={3} variant="h4">
        Подача оголошення
      </Typography>
      <form
        style={{
          width: "100%",
          display: "flex",
          gap: 32,
          flexDirection: "column",
        }}
      >
        <StyledFormControl fullWidth>
          <StyledFormLabel>Фотографії</StyledFormLabel>
          <Controller
            control={control}
            name="upload photo"
            render={({ field: { onBlur, onChange, value } }) => (
              <Stack>
                <StyledFileInput>
                  <Stack
                    sx={{ display: selectedImage.length < 6 ? "" : "none" }}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/png, image/jpeg"
                      style={{ display: "none" }}
                      onChange={(event) => {
                        onChange();
                        handleImageUpload(event);
                      }}
                      onBlur={onBlur}
                      value={value}
                    />
                    <StyledFileLable htmlFor="upload-photo">
                      <Button
                        id="upload-photo-btn"
                        onClick={() => fileRef.current?.click()}
                        component="span"
                      >
                        <img
                          src={upload}
                          alt={upload}
                          style={{ width: "6.5rem" }}
                        />
                      </Button>
                      {selectedImage.length} з 6
                    </StyledFileLable>
                  </Stack>
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
                            <IconButton
                              onClick={(event) => handleImageRotate(event, img)}
                            >
                              <RefreshOutlinedIcon
                                sx={{ color: "primary.light" }}
                                fontSize="small"
                              />
                            </IconButton>
                            <IconButton onClick={() => handleImageDelete(img)}>
                              <DeleteOutlineOutlinedIcon
                                sx={{ color: "primary.light" }}
                                fontSize="small"
                              />
                            </IconButton>
                          </Stack>
                        </Stack>
                      );
                    })}
                </StyledFileInput>
                <Typography color="primary.main" variant="subtitle2">
                  Перше фото - обкладинка. Оберіть найкраще фото для вашого
                  товару
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
              render={({ field }) => (
                <Stack width="47.5rem">
                  <StyledFormLabel> Назва</StyledFormLabel>
                  <TextField {...field} size="small" />
                  <Typography color="primary.main" variant="subtitle2">
                    Напишіть назву українською мовою
                  </Typography>
                </Stack>
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onBlur, onChange, value } }) => (
                <Stack width="47.5rem">
                  <StyledFormLabel>Опис</StyledFormLabel>
                  <TextField
                    multiline
                    minRows={2}
                    onChange={(event) => {
                      onChange();
                      setDesc(event.target.value);
                    }}
                    onBlur={onBlur}
                    value={value}
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="primary.main" variant="subtitle2">
                      Додайте опис українською мовою
                    </Typography>
                    <Typography color="primary.main" variant="subtitle2">
                      {`${desc.length} / 1000`}
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
            render={({ field }) => (
              <Stack width="47.5rem">
                <StyledFormLabel> Вкажіть категорію</StyledFormLabel>
                <Select
                  displayEmpty
                  defaultValue=""
                  input={<OutlinedInput />}
                  inputProps={{ "aria-label": "Without label" }}
                  id="select-category"
                  {...field}
                  MenuProps={{
                    sx: {
                      ".MuiPaper-root": menuStyles,
                    },
                  }}
                  size="small"
                >
                  <MenuItem
                    sx={{
                      color: "secondary.main",
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
              render={({ field }) => (
                <Stack width="22rem">
                  <StyledFormLabel>Вкажіть ціну у гривнях</StyledFormLabel>
                  <TextField {...field} size="small" type="number" />
                  <Typography color="primary.main" variant="subtitle2">
                    Наприклад: 99.99
                  </Typography>
                </Stack>
              )}
            />
            <StyledFormControl>
              <Controller
                control={control}
                name="free"
                render={({ field }) => (
                  <FormControlLabel
                    label="Безкоштовно"
                    control={<Checkbox {...field} />}
                  />
                )}
              />
            </StyledFormControl>
            <StyledFormControl>
              <Controller
                control={control}
                name="goodtype"
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="new"
                      control={<Radio />}
                      label="Нове"
                    />
                    <FormControlLabel
                      value="used"
                      control={<Radio />}
                      label="Вживане"
                    />
                  </RadioGroup>
                )}
              />
            </StyledFormControl>
          </Stack>
        </StyledFormControl>
      </form>
    </Stack>
  );
};
