import { CityData } from 'types';

export const transactions = [
  {
    transactionID: '#123456',
    user: 'Lena Mayer',
    item: 'Under Armour Shorts',
    status: 'Ready for dispatch',
    amount: '$ 49.90',
    link: '#'
  },
  {
    transactionID: '#234567',
    user: 'Max Smith',
    item: 'Book - Wealth of Nations',
    status: 'Ready for dispatch',
    amount: '$ 19.90',
    link: '#'
  },
  {
    transactionID: '#345678',
    user: 'Anna Stone',
    item: 'Garmin Forerunner 945',
    status: 'Cancelled',
    amount: '$ 499.90',
    link: '#'
  },
  {
    transactionID: '#4567890',
    user: 'Truls Cumbersome',
    item: 'Running Backpack',
    status: 'Shipped',
    amount: '$ 89.90',
    link: '#'
  },
  {
    transactionID: '#5678901',
    user: 'Peter Pikser',
    item: 'Rolex Submariner Replica',
    status: 'Cancelled',
    amount: '$ 299.90',
    link: '#'
  },
  {
    transactionID: '#6789012',
    user: 'Phlipp Forest',
    item: 'On Clouds Shoes',
    status: 'Ready for dispatch',
    amount: '$ 290.90',
    link: '#'
  },
  {
    transactionID: '#78901234',
    user: 'Mara Pacemaker',
    item: 'Ortovox Backpack 40l',
    status: 'Shipped',
    amount: '$ 150.00',
    link: '#'
  },
  {
    transactionID: '#89012345',
    user: 'Sev Major',
    item: 'Oakley Jawbreaker',
    status: 'Ready for dispatch',
    amount: '$ 190.90',
    link: '#'
  }
];

export const regions = [
  { key: 'all', name: 'All Regions' },
  { key: 'us', name: 'United States' },
  { key: 'europe', name: 'Europe' },
  { key: 'asia', name: 'Asia' }
];

export const cities: CityData[] = [
  {
    name: 'New York',
    region: 'us',
    sales: 984888,
    delta: '6.1%',
    deltaType: 'increase'
  },
  {
    name: 'London',
    region: 'europe',
    sales: 456700,
    delta: '1.2%',
    deltaType: 'moderateDecrease'
  },
  {
    name: 'San Francisco',
    region: 'us',
    sales: 240000,
    delta: '2.3%',
    deltaType: 'moderateIncrease'
  },
  {
    name: 'Hong Kong',
    region: 'asia',
    sales: 390800,
    delta: '0.5%',
    deltaType: 'moderateDecrease'
  },
  {
    name: 'Singapore',
    region: 'asia',
    sales: 190800,
    delta: '1.8%',
    deltaType: 'moderateIncrease'
  },
  {
    name: 'Zurich',
    region: 'europe',
    sales: 164400,
    delta: '3.4%',
    deltaType: 'decrease'
  },
  {
    name: 'Vienna',
    region: 'europe',
    sales: 139800,
    delta: '3.1%',
    deltaType: 'moderateIncrease'
  }
];

export const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];
