import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyledFileInput,
  StyledFileLable,
  StyledFormControl,
  StyledFormLabel,
} from "./style";

import upload from "../../../img/upload-file.png";

export const ProductForm = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    trigger,
    reset,
  } = useForm({});

  return (
    <Stack alignItems="start" spacing={3}>
      <Typography mb={3} variant="h4">
        Подача оголошення
      </Typography>
      <form style={{ width: "100%" }}>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Фотографії</StyledFormLabel>
          <Controller
            control={control}
            name="upload photo"
            render={({ field: { onBlur, onChange, value } }) => (
              <StyledFileInput>
                <input
                  ref={fileRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  //   {...field}
                />
                <StyledFileLable htmlFor="upload-photo">
                  <Button
                    onClick={() => fileRef.current?.click()}
                    component="span"
                  >
                    <img src={upload} style={{ height: "7rem" }} />
                  </Button>
                  6 із 6
                </StyledFileLable>
              </StyledFileInput>
            )}
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <StyledFormLabel>Назва та опис</StyledFormLabel>
          <Controller
            control={control}
            name="title"
            render={({ field: { onBlur, onChange, value } }) => (
              <>
                <StyledFormLabel> Назва</StyledFormLabel>
                <TextField />
              </>
            )}
          />
        </StyledFormControl>
      </form>
    </Stack>
  );
};
