import * as yup from 'yup';
import { categoryWithoutGoodtype } from '../../../constants';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { FormDataAddAdvert } from '../../../types';

export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^0-9+]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 3) return '+38';
  if (phoneNumberLength < 7) return phoneNumber;
  if (phoneNumberLength < 12) {
    return `${phoneNumber.slice(0, 3)} (${phoneNumber.slice(
      3,
      6
    )}) ${phoneNumber.slice(6)}`;
  }
  return `${phoneNumber.slice(0, 3)} (${phoneNumber.slice(
    3,
    6
  )}) ${phoneNumber.slice(6, 9)} ${phoneNumber.slice(
    9,
    11
  )} ${phoneNumber.slice(11, 13)}`;
};

export const addAdvertSchema = yup.object().shape({
  title: yup
    .string()
    .required('Не забудьте ввести назву')
    .max(45, 'Максимальна довжина назви - 45 символів')
    .min(3, 'Мінімальна довжина назви - 3 символи'),
  description: yup
    .string()
    .required('Не забудьте додати опис')
    .min(3, 'Мінімальна довжина опису - 3 символи')
    .max(1000, 'Максимальна довжина опису - 1000 символів'),
  category: yup.string().required('Не забудьте обрати категорію'),
  location: yup.string().required('Не забудьте обрати місцезнаходження'),
  price: yup
    .string()
    .required('Не забудьте вказати ціну')
    .test({
      name: 'bigIng',
      message: 'Введене значення завелике для обробки',
      test: (value) => Number(value) < Number.MAX_SAFE_INTEGER,
    })
    .test({
      name: 'decimal',
      message: 'Вкажіть ціну у форматі двох знаків після коми',
      test: (value) => {
        return value.split('.')[1] ? value.split('.')[1]?.length <= 2 : true;
      },
    }),
  contactNumber: yup
    .string()
    .required('Не забудьте вказати номер телефону')
    .matches(
      /(?=.*\+[0-9]{2}\s?[(0-9)]{5}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$)/gm,
      'Невірний формат номеру'
    ),
  free: yup.boolean(),
  photos: yup.string(),
  goodtype: yup.string().when('category', {
    is: (value: string) => !categoryWithoutGoodtype.includes(value),
    then: (schema) => schema.required('Не забудьте вказати тип товару'),
  }),
  contactName: yup
    .string()
    .required('Не забудьте ввести ваше ім’я')
    .min(2, 'Мінімальна довжина 2 символи')
    .max(30, 'Максимальна довжина 30 символи'),
  agree: yup
    .boolean()
    .oneOf([true], 'Ви маєте погодитися з Політикою конфіденційності'),
});

export interface InputProps {
  control: Control<FormDataAddAdvert>;
  errors: FieldErrors<FormDataAddAdvert>;
  loading: boolean;
}
