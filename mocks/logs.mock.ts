import { Log, LogStatus } from 'models/log.model';
import {
  generateListOfRandomUserFullNames,
  generateRandomDate,
  generateRandomNumber
} from 'utils';

export const allLogs: Log[] = [
  {
    logId: 1,
    formId: 1,
    locationId: 2,
    status: LogStatus.OPEN,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 2,
    formId: 1,
    locationId: 2,
    status: LogStatus.OPEN,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 3,
    formId: 1,
    locationId: 2,
    status: LogStatus.VOID_PENDING_ACTIONS,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 4,
    formId: 2,
    locationId: 2,
    status: LogStatus.PENDING_UPDATE,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 5,
    formId: 2,
    locationId: 2,
    status: LogStatus.PENDING_UPDATE,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 6,
    formId: 3,
    locationId: 51,
    status: LogStatus.OPEN,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 7,
    formId: 3,
    locationId: 51,
    status: LogStatus.VOID_PENDING_ACTIONS,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 8,
    formId: 3,
    locationId: 51,
    status: LogStatus.PENDING_UPDATE,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  },
  {
    logId: 9,
    formId: 3,
    locationId: 51,
    status: LogStatus.PENDING_UPDATE,
    submittedDate: generateRandomDate(
      new Date(2022, 1, 1),
      new Date(2022, 12, 31)
    ),
    performedBySignatures: generateListOfRandomUserFullNames(
      generateRandomNumber(2)
    )
  }
];
