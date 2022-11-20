import {
  Title,
  Footer,
  ButtonInline,
  Card,
  DeltaType,
  MultiSelectBox,
  MultiSelectBoxItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeaderCell,
  Flex
} from '@tremor/react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Location } from 'models/location.model';
import { useState } from 'react';

interface level1DetailCardProps {
  location: Location;
}

type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
};

const salesPeople: SalesPerson[] = [
  {
    name: 'Peter Doe',
    leads: 45,
    sales: '1,000,000',
    quota: '1,200,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'moderateIncrease'
  },
  {
    name: 'Lena Whitehouse',
    leads: 35,
    sales: '900,000',
    quota: '1,000,000',
    variance: 'low',
    region: 'Region B',
    status: 'average',
    deltaType: 'unchanged'
  },
  {
    name: 'Phil Less',
    leads: 52,
    sales: '930,000',
    quota: '1,000,000',
    variance: 'medium',
    region: 'Region C',
    status: 'underperforming',
    deltaType: 'moderateDecrease'
  },
  {
    name: 'John Camper',
    leads: 22,
    sales: '390,000',
    quota: '250,000',
    variance: 'low',
    region: 'Region A',
    status: 'overperforming',
    deltaType: 'increase'
  },
  {
    name: 'Max Balmoore',
    leads: 49,
    sales: '860,000',
    quota: '750,000',
    variance: 'low',
    region: 'Region B',
    status: 'overperforming',
    deltaType: 'increase'
  },
  {
    name: 'Peter Moore',
    leads: 82,
    sales: '1,460,000',
    quota: '1,500,000',
    variance: 'low',
    region: 'Region A',
    status: 'average',
    deltaType: 'unchanged'
  },
  {
    name: 'Joe Sachs',
    leads: 49,
    sales: '1,230,000',
    quota: '1,800,000',
    variance: 'medium',
    region: 'Region B',
    status: 'underperforming',
    deltaType: 'moderateDecrease'
  }
];

export default function Level1DetailCard({
  location: { locationName }
}: level1DetailCardProps) {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    selectedNames.includes(salesPerson.name) || selectedNames.length === 0;

  return (
    <Card>
      <Flex justifyContent={'justify-between'}>
        <Title>{locationName}</Title>
        <MultiSelectBox
          handleSelect={(value) => setSelectedNames(value)}
          placeholder="Select Level 2"
          maxWidth="max-w-xs"
        >
          {salesPeople.map((item) => (
            <MultiSelectBoxItem
              key={item.name}
              value={item.name}
              text={item.name}
            />
          ))}
        </MultiSelectBox>
      </Flex>
      <Table marginTop="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Level 2</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Open</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Pending Update
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">
              Void Pending Actions
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell textAlignment="text-right">{item.leads}</TableCell>
                <TableCell textAlignment="text-right">{item.sales}</TableCell>
                <TableCell textAlignment="text-right">{item.quota}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Footer>
        <ButtonInline
          size="sm"
          text="View details"
          icon={ArrowRightIcon}
          iconPosition="right"
          color={'teal'}
        />
      </Footer>
    </Card>
  );
}
