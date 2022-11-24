import { useState } from 'react';
import {
  Card,
  Title,
  Flex,
  Table,
  TableRow,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Datepicker,
  Text
} from '@tremor/react';

import { logSummaryDtos } from 'helpers/log.helper';
import { allFormIds } from 'helpers/form.helper';
import { LogStatus } from 'models/log.model';
import {
  selectStatusFilter,
  persistStatusFilter
} from 'slices/log-list-filter.slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { colors } from 'app-constants';

import FormNameSelectBox from 'components/details-page-container/filters/form-name-select-box';
import LogStatusSelectBox from 'components/details-page-container/filters/log-status-select-box';

export default function LogList() {
  const dispatch = useAppDispatch();
  const initialStatusFilter = useAppSelector(selectStatusFilter);
  const [selectedStatuses, setSelectedStatuses] =
    useState<LogStatus[]>(initialStatusFilter);
  const [selectedFormIds, setSelectedFormIds] = useState<number[]>(allFormIds);
  const [selectedDateRange, setSelectedDateRange] = useState<[Date, Date]>([
    new Date(0, 0, 0),
    new Date()
  ]);

  const filteredLogDtos = logSummaryDtos.filter(
    (logDto) =>
      selectedStatuses.includes(logDto.status) &&
      selectedFormIds.includes(logDto.formId) &&
      selectedDateRange[0] <= logDto.submittedDate &&
      logDto.submittedDate <= selectedDateRange[1]
  );

  const onStatusSelected = (statuses: LogStatus[]) => {
    setSelectedStatuses(statuses);
    dispatch(persistStatusFilter(statuses));
  };

  const onFormNameSelected = (formIds: number[]) => {
    setSelectedFormIds(formIds);
  };

  const onSubmittedDateSelected = (startDate: Date, endDate: Date) => {
    setSelectedDateRange([startDate, endDate]);
  };

  return (
    <Card>
      <Flex justifyContent="justify-between">
        <Title>Log(s)</Title>
        <div className="flex space-x-4">
          <FormNameSelectBox onFormNameSelected={onFormNameSelected} />
          <LogStatusSelectBox
            onStatusSelected={onStatusSelected}
            initialStatuses={initialStatusFilter}
          />
          <div>
            <Text>Submitted Date</Text>
            <Datepicker
              handleSelect={onSubmittedDateSelected}
              enableRelativeDates={true}
              maxWidth="max-w-md"
              marginTop={'mt-2'}
            />
          </div>
        </div>
      </Flex>

      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Level 0</TableHeaderCell>
            <TableHeaderCell>Level 1</TableHeaderCell>
            <TableHeaderCell>Level 2</TableHeaderCell>
            <TableHeaderCell>Form Name</TableHeaderCell>
            <TableHeaderCell>Form Version</TableHeaderCell>
            <TableHeaderCell>Log ID</TableHeaderCell>
            <TableHeaderCell>Log Status</TableHeaderCell>
            <TableHeaderCell>Performed By(s)</TableHeaderCell>
            <TableHeaderCell>Pending action(s)</TableHeaderCell>
            <TableHeaderCell>
              Checked | Reviewed | Approved By(s)
            </TableHeaderCell>
            <TableHeaderCell>Submitted Date</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredLogDtos.map(
            ({
              logId,
              level0,
              level1,
              level2,
              formVersion,
              formName,
              status,
              performedBySignatures,
              submittedDate
            }) => (
              <TableRow key={logId}>
                <TableCell>{level0}</TableCell>
                <TableCell>{level1}</TableCell>
                <TableCell>{level2}</TableCell>
                <TableCell>{formName}</TableCell>
                <TableCell>{formVersion}</TableCell>
                <TableCell>{logId}</TableCell>
                <TableCell>
                  <Badge color={colors[status]} text={status} size="xs" />
                </TableCell>
                <TableCell>{performedBySignatures.join(', ')}</TableCell>
                <TableCell>{''}</TableCell>
                <TableCell>{''}</TableCell>
                <TableCell>{submittedDate.toDateString()}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
