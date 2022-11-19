import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color
} from '@tremor/react';

import { transactions } from 'mocks';

export const colors: { [key: string]: Color } = {
  'Ready for dispatch': 'gray',
  Cancelled: 'rose',
  Shipped: 'emerald'
};

export default function LogList() {
  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>Purchases</Title>
        <Badge text="8" color="gray" />
      </Flex>
      <Text marginTop="mt-2">Overview of this month&apos;s purchases</Text>

      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction ID</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
            <TableHeaderCell>Link</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((item) => (
            <TableRow key={item.transactionID}>
              <TableCell>{item.transactionID}</TableCell>
              <TableCell>{item.user}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell>
                <Badge
                  color={colors[item.status]}
                  text={item.status}
                  size="xs"
                />
              </TableCell>
              <TableCell textAlignment="text-right">{item.amount}</TableCell>
              <TableCell>
                <Button
                  size="xs"
                  importance="secondary"
                  text="See details"
                  color="gray"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
