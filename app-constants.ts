import { Color } from '@tremor/react';

import { LogStatus } from 'models/log.model';

export const colors: { [key in LogStatus]: Color } = {
  Open: 'red',
  'Partially Submitted': 'green',
  'Pending Update': 'yellow',
  Void: 'gray',
  'Void Pending Actions': 'gray',
  Completed: 'blue'
};

export const allStatuses: LogStatus[] = [
  LogStatus.OPEN,
  LogStatus.PARTIALLY_SUBMITTED,
  LogStatus.PENDING_UPDATE,
  LogStatus.VOID,
  LogStatus.VOID_PENDING_ACTIONS,
  LogStatus.COMPLETED
];
