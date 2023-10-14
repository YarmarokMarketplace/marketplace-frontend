import { CreateOrderInput, DeliveryData, NovaPostSchema } from 'src/types';
import * as yup from 'yup';

export const createOrderSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`Не забудьте ввести ім'я`)
    .max(30, 'Максимальна довжина - 30 символів')
    .min(2, 'Мінімальна довжина - 2 символи'),
  lastName: yup
    .string()
    .required('Не забудьте ввести призвіще')
    .max(30, 'Максимальна довжина - 30 символів')
    .min(2, 'Мінімальна довжина - 2 символи'),
  patronymic: yup.string(),
  phone: yup
    .string()
    .required('Не забудьте вказати номер телефону')
    .matches(
      /(?=.*\+[0-9]{2}\s?[(0-9)]{5}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$)/gm,
      'Невірний формат номеру'
    ),
  deliveryType: yup.string().required('Не забудьте обрати тип доставки'),
  novaPostType: yup.string(),
  department: yup.string().when(['deliveryType', 'novaPostType'], {
    is: (deliveryType: string, novaPostType: string) =>
      deliveryType === 'NovaPost' && novaPostType === 'department',
    then: (schema) => schema.required('Не забудьте вказати номер відділення'),
  }),
  city: yup.string().when('deliveryType', {
    is: (deliveryType: string) =>
      deliveryType === 'NovaPost' || deliveryType === 'UkrPost',
    then: (schema) => schema.required('Не забудьте вказати населений пункт'),
  }),
  street: yup.string().when(['deliveryType', 'novaPostType'], {
    is: (deliveryType: string, novaPostType: string) =>
      deliveryType === 'NovaPost' && novaPostType === 'address',
    then: (schema) => schema.required('Не забудьте вказати вулицю'),
  }),

  house: yup.string().when(['deliveryType', 'novaPostType'], {
    is: (deliveryType: string, novaPostType: string) =>
      deliveryType === 'NovaPost' && novaPostType === 'address',
    then: (schema) => schema.required('Не забудьте вказати номер будинку'),
  }),

  flat: yup.string().when(['deliveryType', 'novaPostType'], {
    is: (deliveryType: string, novaPostType: string) =>
      deliveryType === 'NovaPost' && novaPostType === 'address',
    then: (schema) => schema.required('Не забудьте вказати номер квартири'),
  }),

  postOffice: yup.string().when(['deliveryType', 'novaPostType'], {
    is: (deliveryType: string, novaPostType: string) =>
      deliveryType === 'NovaPost' && novaPostType === 'postOffice',
    then: (schema) => schema.required('Не забудьте вказати номер поштомату'),
  }),

  postCode: yup.string().when('deliveryType', {
    is: (deliveryType: string) => deliveryType === 'Ukrpost',
    then: (schema) => schema.required('Не забудьте вказати поштовий індекс'),
  }),

  saveData: yup.boolean(),
  comment: yup.string().when('deliveryType', {
    is: (deliveryType: string) => deliveryType === 'Other',
    then: (schema) => schema.required('Вкажіть бажаний спосіб доставки').min(3),
  }),
});

export const createOrderDefaultValues = {
  firstName: '',
  lastName: '',
  patronymic: '',
  phone: '',
  deliveryType: 'NovaPost',
  department: '',
  city: '',
  street: '',
  house: '',
  flat: '',
  postOffice: '',
  postCode: '',
  saveData: false,
  comment: '',
  novaPostType: 'department',
};

export const setDeliveryData = (values: CreateOrderInput) => {
  const deliveryData: DeliveryData = {};
  if (values.deliveryType === 'Other') {
    deliveryData.otherSchema = {
      typeOfOtherDelivery: values.comment,
    };
  }
  if (values.deliveryType === 'UkrPost') {
    deliveryData.ukrPostSchema = {
      city: values.city,
      index: values.postCode,
      street: values.street,
      house: values.house,
      apartments: values.flat,
    };
  }
  if (values.deliveryType === 'NovaPost') {
    const novaPostTypeDelivery: NovaPostSchema = {
      typeOfNovaPostDelivery: {},
    };
    if (values.novaPostType === 'department') {
      novaPostTypeDelivery.typeOfNovaPostDelivery.postOfficeSchema = {
        postOfficeNumber: values.department,
        city: values.city,
      };
    }
    if (values.novaPostType === 'address') {
      novaPostTypeDelivery.typeOfNovaPostDelivery.addressSchema = {
        city: values.city,
        street: values.street,
        house: values.house,
        apartments: values.flat,
      };
    }
    if (values.novaPostType === 'postOffice') {
      novaPostTypeDelivery.typeOfNovaPostDelivery.postBoxSchema = {
        postBoxNumber: values.postOffice,
        city: values.city,
      };
    }
    deliveryData.newPostSchema = novaPostTypeDelivery;
  }

  return deliveryData;
};
