export interface Form {
  formId: number;
  formName: string;
  formVersion: number;
  formDescription: string;
  assignedToLocationId: number;
}

export type FormDictionary = Record<number, Form>;
