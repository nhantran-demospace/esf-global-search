import { CityData } from 'types';

export const valueFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()} $`;

export const filterByRegion = (region: string, data: CityData[]) =>
  region === 'all' ? data : data.filter((city) => city.region === region);

export const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();
