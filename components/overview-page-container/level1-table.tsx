import { useRouter } from 'next/router';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  ButtonInline
} from '@tremor/react';
import { locationStatisticDictionary } from 'helpers/location.helper';
import { Location } from 'models/location.model';
import { LogStatus } from 'models/log.model';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  persistSelectedLevel1Ids,
  selectSelectedLevel1Ids
} from 'slices/location.slice';
import { persistStatusFilter } from 'slices/log-list-filter.slice';
import { Path } from 'enums';

interface Level1TableProps {
  matchingLevel1Locations: Location[];
}

export const Level1Table = ({ matchingLevel1Locations }: Level1TableProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const selectedLevel1Locations = matchingLevel1Locations.filter((level1) =>
    selectedLevel1Ids.includes(level1.locationId)
  );

  const onStatisticClick = (level1Id: number, status: LogStatus) => {
    dispatch(persistStatusFilter([status]));
    dispatch(persistSelectedLevel1Ids([level1Id]));
    router.push(`${Path.Detail}`);
  };

  return (
    <Table>
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
                <ButtonInline
                  text={String(locationStatisticDictionary[level1Id].openCount)}
                  handleClick={() => onStatisticClick(level1Id, LogStatus.OPEN)}
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline
                  text={String(
                    locationStatisticDictionary[level1Id].pendingUpdateCount
                  )}
                  handleClick={() =>
                    onStatisticClick(level1Id, LogStatus.PENDING_UPDATE)
                  }
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline
                  text={String(
                    locationStatisticDictionary[level1Id]
                      .voidPendingActionsCount
                  )}
                  handleClick={() =>
                    onStatisticClick(level1Id, LogStatus.VOID_PENDING_ACTIONS)
                  }
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline text={String(0)} color={'teal'} />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
