export const categoryNames: { [key: string]: string } = {
  auto: 'Авто',
  'business-and-services': 'Бізнес та послуги',
  'for-free': 'Безкоштовно',
  "children's-world": 'Дитячий світ',
  'home-and-garden': 'Дім і сад',
  help: 'Допомога',
  electronics: 'Електроніка',
  'spare-parts-for-transport': 'Запчастини для транспорту',
  'fashion-and-style': 'Мода і стиль',
  realty: 'Нерухомість',
  exchange: 'Обмін',
  repair: 'Ремонт',
  work: 'Робота',
  animals: 'Тварини',
  'goods-to-win': 'Товари для перемоги',
  'hobbies-recreation-sports': 'Хобі, відпочинок і спорт',
};

import ua from '../img/locations/ukraine.png';
import kyiv from '../img/locations/kyiv.png';
import dnipro from '../img/locations/dnipro.png';
import kharkiv from '../img/locations/kharkiv.png';
import odesa from '../img/locations/odesa.png';

export const locations: Array<{ label: string; value: string; img?: string }> =
  [
    { label: 'Вся Україна', value: 'Ukraine', img: ua },
    { label: 'Популярні', value: '' },
    { label: 'Київ', value: 'Kyiv', img: kyiv },
    { label: 'Київська область', value: 'Kyiv-region' },
    { label: 'Дніпро', value: 'Dnipro', img: dnipro },
    { label: 'Дніпропетровська область', value: 'Dnipro-region' },
    { label: 'Харків', value: 'Kharkiv', img: kharkiv },
    { label: 'Харківська область', value: 'Kharkiv-region' },
    { label: 'Одеса', value: 'Odesa', img: odesa },
    { label: 'Одеська область', value: 'Odesa-region' },
    { label: 'Інші', value: '' },
    { label: 'Львів', value: 'Lviv' },
    { label: 'Львівська область', value: 'Lviv-region' },
    { label: 'Херсон', value: 'Kherson' },
    { label: 'Херсонська область', value: 'Kherson-region' },
    { label: 'Вінниця', value: 'Vinnytsia' },
    { label: 'Вінницька область', value: 'Vinnytsia-region' },
    { label: 'Запоріжжя', value: 'Zaporizhzhia' },
    { label: 'Запорізька область', value: 'Zaporizhzhia-region' },
    { label: 'Ужгород', value: 'Uzhgorod' },
    { label: 'Закарпатська область', value: 'Transcarpathia-region' },
    { label: 'Миколаїв', value: 'Mykolaiv' },
    { label: 'Миколаївська область', value: 'Mykolaiv-region' },
    { label: 'Тернопіль', value: 'Ternopil' },
    { label: 'Тернопільська область', value: 'Ternopil-region' },
    { label: 'Чернівці', value: 'Chernivtsi' },
    { label: 'Чернівецька область', value: 'Chernivtsi-region' },
    { label: 'Черкаси', value: 'Cherkasy' },
    { label: 'Черкаська область', value: 'Cherkasy-region' },
    { label: 'Хмельницький', value: 'Khmelnytskyi' },
    { label: 'Хмельницька область', value: 'Khmelnytskyi-region' },
    { label: 'Чернігів', value: 'Chernigov' },
    { label: 'Чернігівська область', value: 'Chernigov-region' },
    { label: 'Житомир', value: 'Zhitomir' },
    { label: 'Житомирська область', value: 'Zhitomir-region' },
    { label: 'Суми', value: 'Sumy' },
    { label: 'Сумська область', value: 'Sumy-region' },
    { label: 'Полтава', value: 'Poltava' },
    { label: 'Полтавська область', value: 'Poltava-region' },
    { label: 'Рівне', value: 'Rivne' },
    { label: 'Рівненська область', value: 'Rivne-region' },
    { label: 'Кропивницький', value: 'Kropyvnytskyi' },
    { label: 'Кіровоградська область', value: 'Kirovograd-region' },
    { label: 'Луцьк', value: 'Lutsk' },
    { label: 'Волинська область', value: 'Volyn-region' },
    { label: 'Івано-Франківськ', value: 'Ivano-frankivsk' },
    { label: 'Івано-Франківська область', value: 'Ivano-frankivsk-region' },
    { label: 'Донецьк', value: 'Donetsk' },
    { label: 'Донецька область', value: 'Donetsk-region' },
    { label: 'Луганськ', value: 'Luhansk' },
    { label: 'Луганська область', value: 'Luhansk-region' },
    { label: 'Сімферополь', value: 'Simferopol' },
    { label: 'Крим', value: 'Crimea' },
  ];
export const goodTypeNames: { [key: string]: string } = {
  new: 'Нове',
  used: 'Вживане',
};

export const categoriesDeliveryAbsense = [
  'business-and-services',
  'help',
  'repair',
  'realty',
  'work',
  'animals',
];
export const categoryWithoutGoodtype = [
  'animals',
  'work',
  'repair',
  'business-and-services',
  'help',
];

export const deliveryOption: Array<{ label: string; value: string }> = [
  { label: 'Нова пошта', value: 'new-post' },
  { label: 'Укрпошта', value: 'ukr-post' },
  { label: 'Інше', value: 'other' },
];
