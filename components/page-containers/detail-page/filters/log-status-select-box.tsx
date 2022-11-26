import { MultiSelectBox, MultiSelectBoxItem, Text } from '@tremor/react';

import { LogStatus } from 'models/log.model';
import { allStatuses } from 'app-constants';

interface LogStatusSelectBoxProps {
  onStatusSelected: (statuses: LogStatus[]) => void;
  initialStatuses: LogStatus[];
}

const LogStatusSelectBox = ({
  onStatusSelected,
  initialStatuses
}: LogStatusSelectBoxProps) => {
  return (
    <div>
      <Text>Log status</Text>
      <MultiSelectBox
        defaultValues={initialStatuses}
        handleSelect={onStatusSelected}
        maxWidth="max-w-0"
        marginTop={'mt-2'}
      >
        {allStatuses.map((status) => (
          <MultiSelectBoxItem key={`${status}`} value={status} text={status} />
        ))}
      </MultiSelectBox>
    </div>
  );
};

export default LogStatusSelectBox;
