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
  MultiSelectBox,
  MultiSelectBoxItem,
  Datepicker
} from '@tremor/react';

import { logSummaryDtos } from 'helpers/log.helper';
import { getFormById } from 'helpers/form.helper';
import { LogStatus } from 'models/log.model';
import { allForms } from 'mocks/forms.mock';
import {
  selectStatusFilter,
  persistStatusFilter
} from 'slices/log-list-filter.slice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { allStatuses, colors } from 'app-constants';

const allFormIds = allForms.map((form) => form.formId);
const allFormNames = allForms.map((form) => form.formName);

export default function LogList() {
  const dispatch = useAppDispatch();
  const initialStatusFilter = useAppSelector(selectStatusFilter);
  const [selectedStatuses, setSelectedStatuses] =
    useState<LogStatus[]>(initialStatusFilter);
  const [selectedFormIds, setSelectedFormIds] = useState<number[]>(allFormIds);

  const filteredLogDtos = logSummaryDtos.filter(
    (logDto) =>
      selectedStatuses.includes(logDto.status) &&
      selectedFormIds.includes(logDto.formId)
  );

  const onStatusSelected = (statuses: LogStatus[]) => {
    setSelectedStatuses(statuses);
    dispatch(persistStatusFilter(statuses));
  };

  return (
    <Card>
      <Flex justifyContent="justify-between">
        <Title>Log(s)</Title>
        <div className="flex space-x-4">
          <MultiSelectBox
            defaultValues={initialStatusFilter}
            handleSelect={onStatusSelected}
            placeholder="Select status(s)"
            maxWidth="max-w-0"
          >
            {allStatuses.map((status) => (
              <MultiSelectBoxItem
                key={`${status}`}
                value={status}
                text={status}
              />
            ))}
          </MultiSelectBox>
          <MultiSelectBox
            defaultValues={allFormNames}
            handleSelect={(value) => setSelectedFormIds(value)}
            placeholder="Select form name(s)"
            maxWidth="max-w-xs"
          >
            {allFormIds.map((formId) => (
              <MultiSelectBoxItem
                key={`${formId}`}
                value={formId}
                text={getFormById(formId)?.formName}
              />
            ))}
          </MultiSelectBox>
          <Datepicker
            placeholder="Select date"
            enableRelativeDates={true}
            maxWidth="max-w-xs"
          />
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
              status
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
                <TableCell>{''}</TableCell>
                <TableCell>{''}</TableCell>
                <TableCell>{''}</TableCell>
                <TableCell>{''}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
