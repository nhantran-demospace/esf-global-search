import { faker } from '@faker-js/faker';

export const generateRandomDate = (startDate: Date, endDate: Date) => {
  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
};

export const generateRandomUserFullName = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return `${firstName} ${lastName}`;
};

export const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max) + 1;
};

export const generateListOfRandomUserFullNames = (max: number) => {
  const list: string[] = [];
  for (let i = 0; i < max; i++) {
    list.push(generateRandomUserFullName());
  }
  return list;
};
