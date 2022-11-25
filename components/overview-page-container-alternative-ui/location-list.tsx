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
import { getLocationById, locationSummaryDtos } from 'helpers/location.helper';
import { LogStatus } from 'models/log.model';
import { useAppSelector, useAppDispatch } from 'hooks';
import {
  persistSelectedLevel1Ids,
  selectSelectedLevel1Ids,
  selectSelectedLevel0Id
} from 'slices/location.slice';
import { persistStatusFilter } from 'slices/log-list-filter.slice';
import { Path } from 'enums';

export const LocationList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);

  const matchingLocationDtos = locationSummaryDtos.filter(
    ({ level0Name, level1Name }) =>
      level0Name ===
        getLocationById(selectedLevel0Id ? selectedLevel0Id : 0).locationName &&
      selectedLevel1Ids
        .map((id) => getLocationById(id).locationName)
        .includes(level1Name)
  );

  const onStatisticClick = (level1Id: number, status: LogStatus) => {
    dispatch(persistStatusFilter([status]));
    dispatch(persistSelectedLevel1Ids([level1Id]));
    router.push(`${Path.AlternativeDetail}`);
  };

  return (
    <Table marginTop={'mt-4'}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Level 1</TableHeaderCell>
          <TableHeaderCell>Level 2</TableHeaderCell>
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
        {matchingLocationDtos.map(
          ({
            locationId,
            level1Name,
            level2Name,
            openCount,
            pendingUpdateCount,
            voidPendingActionsCount
          }) => (
            <TableRow key={`${level1Name}-${level2Name}`}>
              <TableCell>{level1Name}</TableCell>
              <TableCell>{level2Name}</TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline
                  text={String(openCount)}
                  handleClick={() =>
                    onStatisticClick(locationId, LogStatus.OPEN)
                  }
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline
                  text={String(pendingUpdateCount)}
                  handleClick={() =>
                    onStatisticClick(locationId, LogStatus.PENDING_UPDATE)
                  }
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline
                  text={String(voidPendingActionsCount)}
                  handleClick={() =>
                    onStatisticClick(locationId, LogStatus.VOID_PENDING_ACTIONS)
                  }
                  color={'teal'}
                />
              </TableCell>
              <TableCell textAlignment={'text-right'}>
                <ButtonInline
                  text={String(
                    openCount + pendingUpdateCount + voidPendingActionsCount
                  )}
                  color={'teal'}
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
