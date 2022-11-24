export interface Log {
  logId: number;
  formId: number;
  locationId: number;
  status: LogStatus;
  submittedDate: Date;
}

export interface LogSummaryDto {
  logId: number;
  formId: number;
  formVersion: number;
  formName: string;
  status: LogStatus;
  submittedDate: Date;
  level0: string;
  level1: string;
  level2: string;
}

export enum LogStatus {
  'PARTIALLY_SUBMITTED' = 'Partially Submitted',
  'PENDING_UPDATE' = 'Pending Update',
  'COMPLETED' = 'Completed',
  'VOID' = 'Void',
  'OPEN' = 'Open',
  'VOID_PENDING_ACTIONS' = 'Void Pending Actions'
}
