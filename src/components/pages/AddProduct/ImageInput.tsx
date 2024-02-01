import { IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
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
import { AppDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { Images, saveAddAdvertImagesAction } from './reducer';

interface ImageInputProps extends InputProps {
  setValue: UseFormSetValue<FormDataAddAdvert>;
  setSelectedImage: React.Dispatch<React.SetStateAction<[] | File[]>>;
  selectedImage: File[] | [];
  edit?: boolean;
}

export const ImageInput: React.FC<ImageInputProps> = ({
  control,
  setValue,
  loading,
  setSelectedImage,
  selectedImage,
  edit,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [imgQuantityError, setImgQuantityError] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const handleStorageImageSave = async (files: File[]) => {
    const photoDataArray = await Promise.all(
      files.map(async (photo) => {
        return new Promise<Images>((resolve) => {
          const reader = new FileReader(); // Create a FileReader to read the file as a Data URL.
          reader.onload = (event) => {
            if (event.target) {
              const photoData = event.target.result; // Extract the Data URL containing the image data.

              resolve({ name: photo.name, type: photo.type, data: photoData }); // Resolve a promise with an object containing the file name, type, and data.
            }
          };
          reader.readAsDataURL(photo);
        });
      })
    );

    if (photoDataArray.length >= 0) {
      dispatch(saveAddAdvertImagesAction(photoDataArray)); // Save images to the redux state
    }
  };
  useEffect(() => {
    const saveImagesAndHandle = async () => {
      await handleStorageImageSave(selectedImage);
    };
    if (!edit) {
      saveImagesAndHandle();
    }
  }, [selectedImage]);

  const handleSelectedImageSaving = async (files: File[]) => {
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
    const canvas = document.createElement('canvas'); // Create a new canvas element for image manipulation
    const context = canvas.getContext('2d');
    if (image && context) {
      // Set the canvas dimensions to match the natural dimensions of the image
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(90 * (Math.PI / 180)); // Rotate the image by 90 degrees (converted to radians)
      context.drawImage(image, -canvas.width / 2, -canvas.height / 2); // Draw the rotated image onto the canvas
    }

    // Convert the canvas content to a Blob
    canvas.toBlob((blob) => {
      if (blob) {
        const rotatedFile = new File([blob], `${target.name}_rotated.jpg`, {
          type: target.type,
          lastModified: Date.now(),
        });
        // Update the selectedImage state by replacing the original file with the rotated file
        setSelectedImage((prevState) => {
          const rotatedImages = prevState.map((file) => {
            if (file == target) {
              return rotatedFile;
            } else {
              return file;
            }
          });

          return rotatedImages;
        });
      }
    }, target.type);
  };
  return (
    <Controller
      control={control}
      name="photos"
      defaultValue=""
      render={({ field: { onBlur, onChange } }) => (
        <Stack width={{ md: '100%', lg: '80%' }}>
          <StyledFileInput
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={() => setDragActive(false)}
            className={selectedImage.length === 0 ? 'empty' : ''}
            sx={{
              justifyContent: selectedImage.length ? 'start' : 'center',
              position: 'relative',
              borderColor: imgQuantityError ? 'error.main' : 'secondary.light',
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
            />

            {selectedImage.length > 0 &&
              selectedImage.map((img: any) => {
                return (
                  <Stack
                    key={typeof img === 'string' ? img : img.name}
                    width="5.5rem"
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
            <StyledFileLable
              sx={{
                minWidth: `calc(100% - ${selectedImage.length} * (5.5rem))`,
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
            id={imgQuantityError ? 'photos-error' : ''}
          >
            {imgQuantityError
              ? 'Ви не можете завантажити більше 6 фото'
              : 'Перше фото - обкладинка. Оберіть найкраще фото для вашого товару.'}
          </Typography>
        </Stack>
      )}
    />
  );
};
