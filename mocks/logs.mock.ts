import { Log, LogStatus } from 'models/log.model';

export const logs: Log[] = [
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
  }
];
