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
import { useAppDispatch } from 'hooks';
import { LogStatus } from 'models/log.model';
import { persistStatusFilter } from 'slices/log-list-filter.slice';
import { Path } from 'enums';

interface Level2TableProps {
  allLevel2Locations: Location[];
  selectedLevel2Ids: number[];
}

export const Level2Table = ({
  selectedLevel2Ids,
  allLevel2Locations
}: Level2TableProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isLevel2Selected = (level2: Location) =>
    selectedLevel2Ids.includes(level2.locationId) ||
    selectedLevel2Ids.length === 0;

  const onStatisticClick = (level1Id: number, status: LogStatus) => {
    dispatch(persistStatusFilter([status]));
    router.push(`${Path.Detail}`);
  };

  return (
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
        {allLevel2Locations
          .filter((level2) => isLevel2Selected(level2))
          .map(({ locationId: level2Id, locationName: level2Name }) => (
            <TableRow key={`${level2Id}-${level2Name}`}>
              <TableCell>{level2Name}</TableCell>
              <TableCell textAlignment="text-right">
                <ButtonInline
                  text={String(locationStatisticDictionary[level2Id].openCount)}
                  handleClick={() => onStatisticClick(level2Id, LogStatus.OPEN)}
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment="text-right">
                <ButtonInline
                  text={String(
                    locationStatisticDictionary[level2Id].pendingUpdateCount
                  )}
                  handleClick={() =>
                    onStatisticClick(level2Id, LogStatus.PENDING_UPDATE)
                  }
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment="text-right">
                <ButtonInline
                  text={String(
                    locationStatisticDictionary[level2Id]
                      .voidPendingActionsCount
                  )}
                  handleClick={() =>
                    onStatisticClick(level2Id, LogStatus.VOID_PENDING_ACTIONS)
                  }
                  color={'teal'}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
