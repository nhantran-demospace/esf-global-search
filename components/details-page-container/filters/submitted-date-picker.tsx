import { Datepicker, Text } from '@tremor/react';

interface SubmittedDatePickerProps {
  onSubmittedDateSelected: (startDate: Date, endDate: Date) => void;
}

const SubmittedDatePicker = ({
  onSubmittedDateSelected
}: SubmittedDatePickerProps) => {
  return (
    <div>
      <Text>Submitted Date</Text>
      <Datepicker
        handleSelect={onSubmittedDateSelected}
        enableRelativeDates={true}
        maxWidth="max-w-md"
        marginTop={'mt-2'}
      />
    </div>
  );
};

export default SubmittedDatePicker;
