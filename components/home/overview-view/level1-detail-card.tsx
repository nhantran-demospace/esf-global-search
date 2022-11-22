import {
  Title,
  Footer,
  ButtonInline,
  Card,
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

import { Level1Info, Location } from 'models/location.model';
import { useState } from 'react';
import { getLevel2Locations, locationStatisticDictionary } from 'helpers/location.helper';

interface level1DetailCardProps {
  level1: Location;
}

export default function Level1DetailCard({
  level1: { locationName, locationId: level1Id, levelInfo: level1Info }
}: level1DetailCardProps) {
  const [selectedLevel2Ids, setSelectedLevel2Ids] = useState<number[]>([]);

  const isLevel2Selected = (level2: Location) =>
    selectedLevel2Ids.includes(level2.locationId) ||
    selectedLevel2Ids.length === 0;

  const level2Locations = getLevel2Locations(
    (level1Info as Level1Info)?.level0Id,
    level1Id
  );

  return (
    <Card>
      <Flex justifyContent={'justify-between'}>
        <Title>{locationName}</Title>
        <MultiSelectBox
          handleSelect={(value) => setSelectedLevel2Ids(value)}
          placeholder="Select Level 2"
          maxWidth="max-w-xs"
        >
          {level2Locations.map(
            ({ locationId: level2Id, locationName: level2Name }) => (
              <MultiSelectBoxItem
                key={`${level2Id}-${level2Name}`}
                value={level2Id}
                text={level2Name}
              />
            )
          )}
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
          {level2Locations
            .filter((level2) => isLevel2Selected(level2))
            .map(({ locationId: level2Id, locationName: level2Name }) => (
              <TableRow key={`${level2Id}-${level2Name}`}>
                <TableCell>{level2Name}</TableCell>
                <TableCell textAlignment="text-right">{locationStatisticDictionary[level2Id].openCount}</TableCell>
                <TableCell textAlignment="text-right">{locationStatisticDictionary[level2Id].pendingUpdateCount}</TableCell>
                <TableCell textAlignment="text-right">{locationStatisticDictionary[level2Id].voidPendingActionsCount}</TableCell>
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
