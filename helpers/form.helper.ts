import { Form, FormDictionary } from 'models/form.model';
import { allForms } from 'mocks/forms.mock';

export const buildFormDictionary = (allForms: Form[]): FormDictionary => {
  const dict: FormDictionary = {};
  allForms.forEach((form) => {
    dict[form.formId] = form;
  });
  return dict;
};

export const getFormById = (formId: number) => {
  return formDictionary[formId];
};

export const formDictionary = buildFormDictionary(allForms);

export const allFormIds = allForms.map((form) => form.formId);
export const allFormNames = allForms.map((form) => form.formName);
