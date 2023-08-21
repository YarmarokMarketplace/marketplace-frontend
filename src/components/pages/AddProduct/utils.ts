import * as yup from "yup";

export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^0-9+]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 3) return "+38";
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
    .required("Не забудьте ввести назву")
    .max(100, "Максимальна довжина назви - 100 символів"),
  description: yup
    .string()
    .required("Не забудьте додати опис")
    .max(1000, "Максимальна довжина опису - 1000 символів"),
  category: yup.string().required("Не забудьте обрати категорію"),
  location: yup.string().required("Не забудьте обрати місцезнаходження"),
  price: yup
    .string()
    .required("Не забудьте вказати ціну")
    .test({
      name: "positive",
      message: "Ціна має бути позитивною",
      test: (value) => Number(value) >= 0,
    })
    .test({
      name: "decimal",
      message: "Вкажіть ціну у форматі двох знаків після коми",
      test: (value) => {
        return value.split(".")[1] ? value.split(".")[1]?.length <= 2 : true;
      },
    }),
  contactNumber: yup
    .string()
    .required("Не забудьте вказати номер телефону")
    .matches(
      /(?=.*\+[0-9]{2}\s?[(0-9)]{5}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$)/gm,
      "Невірний формат номеру"
    ),
  free: yup.boolean(),
  photos: yup.string(),
  goodtype: yup.string(),
  contactName: yup
    .string()
    .required("Не забудьте ввести ваше ім’я")
    .min(2, "Мінімальна довжина 2 символи"),
  agree: yup
    .boolean()
    .oneOf([true], "Ви маєте погодитися з Політикою конфіденційності"),
});
