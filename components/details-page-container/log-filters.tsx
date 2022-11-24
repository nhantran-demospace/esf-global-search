import { Flex, Title } from '@tremor/react';

import FormNameSelectBox from 'components/details-page-container/filters/form-name-select-box';
import LogStatusSelectBox from 'components/details-page-container/filters/log-status-select-box';
import SubmittedDatePicker from 'components/details-page-container/filters/submitted-date-picker';

import { LogStatus } from 'models/log.model';

interface LogFiltersProps {
  onFormNameSelected: (formIds: number[]) => void;
  onStatusSelected: (statuses: LogStatus[]) => void;
  initialStatuses: LogStatus[];
  onSubmittedDateSelected: (startDate: Date, endDate: Date) => void;
}

const LogFilters = ({
  onFormNameSelected,
  onStatusSelected,
  initialStatuses,
  onSubmittedDateSelected
}: LogFiltersProps) => {
  return (
    <Flex justifyContent="justify-between">
      <Title>Log(s)</Title>
      <div className="flex space-x-4">
        <FormNameSelectBox onFormNameSelected={onFormNameSelected} />
        <LogStatusSelectBox
          onStatusSelected={onStatusSelected}
          initialStatuses={initialStatuses}
        />
        <SubmittedDatePicker
          onSubmittedDateSelected={onSubmittedDateSelected}
        />
      </div>
    </Flex>
  );
};

export default LogFilters;
