export interface Product {
  id: number
  img: string
  name: string
  price: number
  category: string[]
}

export const products: Product[] = [
  {
    id: 1,
    name: 'пицца',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSEURH2SZ5Ry70uZvYXBUND4eaQelrRhQTYA&s',
    category: ['пицца'],
    price: 1500,
  },
  {
    id: 2,
    name: 'пицца 2',
    img: 'https://dve-palochky.kz/wp-content/uploads/2020/05/piczcza-pepperoni.png',
    category: ['пицца', 'фаст-фуд'],
    price: 1500,
  },
  {
    id: 3,
    name: 'картошка фри',
    img: 'https://www.patee.ru/r/x6/15/8b/e2/640m.jpg',
    category: ['фаст-фуд', 'снэки'],
    price: 1500,
  },
  {
    id: 4,
    name: 'бургер',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPpp3LxhV3C9R2K1bRNs-6sckOGxThFaaSA&s',
    category: ['фаст-фуд', 'бургер'],
    price: 1500,
  },
  {
    id: 5,
    name: 'кола',
    img: 'https://icdn.lenta.ru/images/2023/03/16/09/20230316090257727/wide_4_3_ccb843e04089affc59f7743839dcc9af.jpg',
    category: ['напитки', 'газировка'],
    price: 1500,
  },
  {
    id: 6,
    name: 'коктейли',
    img: 'https://галерея-гурмэ.рф/upload/iblock/fff/fffad1eae17a266cb1baf9994f551f7b.jpg',
    category: ['напитки'],
    price: 1500,
  },
  {
    id: 7,
    name: 'чизкейк',
    img: 'https://paprikanta.com/wp-content/uploads/2021/12/Cheesecake-Osnovnoe-foto-1300x731.jpg',
    category: ['десерты', 'торты'],
    price: 1500,
  },
  {
    id: 8,
    name: 'нагетсы',
    img: 'https://halal-spb.ru/sites/default/files/styles/large/public/3_1524465214_ebd9d.jpg?itok=vamQ3i6k',
    category: ['фаст-фуд', 'снэки'],
    price: 1500,
  },
];
