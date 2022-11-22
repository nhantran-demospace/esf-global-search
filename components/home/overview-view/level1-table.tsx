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
import { useAppSelector } from 'hooks';
import { selectSelectedLevel1Ids } from 'slices/location.slice';

interface Level1TableProps {
  matchingLevel1Locations: Location[];
}

export const Level1Table = ({ matchingLevel1Locations }: Level1TableProps) => {
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const selectedLevel1Locations = matchingLevel1Locations.filter((level1) =>
    selectedLevel1Ids.includes(level1.locationId)
  );

  return (
    <Table marginTop="mt-4">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Level 1</TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>Open</TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            Pending Update
          </TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            Void Pending Actions
          </TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            Grand Total
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {selectedLevel1Locations.map(
          ({ locationId: level1Id, locationName: level1Name }) => (
            <TableRow key={`${level1Id}-${level1Name}`}>
              <TableCell>{level1Name}</TableCell>
              <TableCell textAlignment={'text-right'}>
                {locationStatisticDictionary[level1Id].openCount}
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                {locationStatisticDictionary[level1Id].pendingUpdateCount}
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                {locationStatisticDictionary[level1Id].voidPendingActionsCount}
              </TableCell>
              <TableCell textAlignment={'text-right'}>0</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
