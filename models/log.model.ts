export interface Log {
  logId: number;
  formId: number;
  locationId: number;
  status: LogStatus;
}

export enum LogStatus {
  'PARTIALLY_SUBMITTED' = 'Partially Submitted',
  'PENDING_UPDATE' = 'Pending Update',
  'COMPLETED' = 'Completed',
  'VOID' = 'Void',
  'OPEN' = 'Open',
  'VOID_PENDING_ACTIONS' = 'Void Pending Actions'
}
