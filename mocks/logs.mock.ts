import { Log, LogStatus } from 'models/log.model';

export const allLogs: Log[] = [
  {
    logId: 1,
    formId: 1,
    locationId: 2,
    status: LogStatus.OPEN
  },
  {
    logId: 2,
    formId: 1,
    locationId: 2,
    status: LogStatus.OPEN
  },
  {
    logId: 3,
    formId: 1,
    locationId: 2,
    status: LogStatus.VOID_PENDING_ACTIONS
  },
  {
    logId: 4,
    formId: 2,
    locationId: 2,
    status: LogStatus.PENDING_UPDATE
  },
  {
    logId: 5,
    formId: 2,
    locationId: 2,
    status: LogStatus.PENDING_UPDATE
  },
  {
    logId: 6,
    formId: 3,
    locationId: 51,
    status: LogStatus.OPEN
  },
  {
    logId: 7,
    formId: 3,
    locationId: 51,
    status: LogStatus.VOID_PENDING_ACTIONS
  },
  {
    logId: 8,
    formId: 3,
    locationId: 51,
    status: LogStatus.PENDING_UPDATE
  },
  {
    logId: 9,
    formId: 3,
    locationId: 51,
    status: LogStatus.PENDING_UPDATE
  }
];
