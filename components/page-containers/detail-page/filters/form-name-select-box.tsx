import { MultiSelectBox, MultiSelectBoxItem, Text } from '@tremor/react';

import { getFormById, allFormIds } from 'helpers/form.helper';

interface FormNameSelectBoxProps {
  onFormNameSelected: (formIds: number[]) => void;
}

const FormNameSelectBox = ({ onFormNameSelected }: FormNameSelectBoxProps) => {
  return (
    <div>
      <Text>Form name</Text>
      <MultiSelectBox
        defaultValues={allFormIds}
        handleSelect={onFormNameSelected}
        maxWidth="max-w-xs"
        marginTop={'mt-2'}
      >
        {allFormIds.map((formId) => (
          <MultiSelectBoxItem
            key={`${formId}`}
            value={formId}
            text={getFormById(formId)?.formName}
          />
        ))}
      </MultiSelectBox>
    </div>
  );
};

export default FormNameSelectBox;
