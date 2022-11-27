import { useState } from 'react';
import { isEmpty } from 'lodash';
import {
  Card,
  Title,
  Table,
  TableRow,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Subtitle
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

import LogFilters from 'components/page-containers/detail-page/log-filters';

import {
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids,
  selectSelectedLevel2Ids
} from 'slices/location.slice';

export default function LogList() {
  const dispatch = useAppDispatch();
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const selectedLevel2Ids = useAppSelector(selectSelectedLevel2Ids);
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
      (!isEmpty(selectedLevel2Ids)
        ? selectedLevel2Ids.includes(logDto.locationId)
        : !isEmpty(selectedLevel1Ids)
        ? selectedLevel1Ids.includes(logDto.locationId)
        : selectedLevel0Id === logDto.locationId) &&
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

  if (isEmpty(filteredLogDtos)) {
    return (
      <Card>
        <LogFilters
          onFormNameSelected={onFormNameSelected}
          onStatusSelected={onStatusSelected}
          initialStatuses={initialStatusFilter}
          onSubmittedDateSelected={onSubmittedDateSelected}
        />

        <div className="text-center my-64">
          <Title>No matching data to show</Title>
          <Subtitle>Select a different filter condition</Subtitle>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <LogFilters
        onFormNameSelected={onFormNameSelected}
        onStatusSelected={onStatusSelected}
        initialStatuses={initialStatusFilter}
        onSubmittedDateSelected={onSubmittedDateSelected}
      />

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
