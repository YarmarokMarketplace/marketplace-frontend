import { IconButton, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Controller, UseFormSetValue } from 'react-hook-form';
import {
  StyledFileInput,
  StyledFileLable,
  StyledPreview,
  StyledUploadButton,
} from './style';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { FormDataAddAdvert } from '../../../types';
import { InputProps } from './utils';

interface ImageInputProps extends InputProps {
  setValue: UseFormSetValue<FormDataAddAdvert>;
  setSelectedImage: React.Dispatch<React.SetStateAction<[] | File[]>>;
  selectedImage: [] | File[];
}
export const ImageInput: React.FC<ImageInputProps> = ({
  control,
  setValue,
  loading,
  setSelectedImage,
  selectedImage,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imgQuantityError, setImgQuantityError] = useState(false);
  const [dragActive, setDragActive] = useState(false);

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
  return (
    <>
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
    </>
  );
};
