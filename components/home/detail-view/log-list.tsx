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
  Color,
  Badge
} from '@tremor/react';

import { logSummaryDtos } from 'helpers/log.helper';
import { LogStatus } from 'models/log.model';

export const colors: { [key in LogStatus]: Color } = {
  Open: 'red',
  'Partially Submitted': 'green',
  'Pending Update': 'yellow',
  Void: 'gray',
  'Void Pending Actions': 'gray',
  Completed: 'blue'
};

export default function LogList() {
  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>Log(s)</Title>
        {/*<Badge text="8" color="gray" />*/}
      </Flex>
      {/*<Text marginTop="mt-2">Overview of this month&apos;s purchases</Text>*/}

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
          {logSummaryDtos.map(
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
