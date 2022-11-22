import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';
import { locationStatisticDictionary } from 'helpers/location.helper';
import { Location } from 'models/location.model';

interface Level1TableProps {
  allLevel1Locations: Location[];
  // selectedLevel2Ids: number[];
}

export const Level1Table = ({
  // selectedLevel2Ids,
  allLevel1Locations
}: Level1TableProps) => {
  // const isLevel2Selected = (level2: Location) =>
  //   selectedLevel2Ids.includes(level2.locationId) ||
  //   selectedLevel2Ids.length === 0;

  return (
    <Table marginTop="mt-4">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Level 1</TableHeaderCell>
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
        {allLevel1Locations
          // .filter((level2) => isLevel2Selected(level2))
          .map(({ locationId: level1Id, locationName: level1Name }) => (
            <TableRow key={`${level1Id}-${level1Name}`}>
              <TableCell>{level1Name}</TableCell>
              <TableCell textAlignment="text-right">
                {locationStatisticDictionary[level1Id].openCount}
              </TableCell>
              <TableCell textAlignment="text-right">
                {locationStatisticDictionary[level1Id].pendingUpdateCount}
              </TableCell>
              <TableCell textAlignment="text-right">
                {locationStatisticDictionary[level1Id].voidPendingActionsCount}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
