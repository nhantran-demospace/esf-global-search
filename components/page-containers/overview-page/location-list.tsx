import { useRouter } from 'next/router';
import {
  ButtonInline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';
import { getLocationById, locationSummaryDtos } from 'helpers/location.helper';
import { LogStatus } from 'models/log.model';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel1Ids,
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids
} from 'slices/location.slice';
import { persistStatusFilter } from 'slices/log-list-filter.slice';
import { Path } from 'enums';

const LocationList = () => {
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
    router.push(`${Path.Detail}`);
  };

  return (
    <Table marginTop={'mt-2'}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Level 1</TableHeaderCell>
          <TableHeaderCell>Level 2</TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            {LogStatus.PARTIALLY_SUBMITTED}
          </TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            {LogStatus.OPEN}
          </TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            {LogStatus.PENDING_UPDATE}
          </TableHeaderCell>
          <TableHeaderCell textAlignment={'text-right'}>
            {LogStatus.VOID_PENDING_ACTIONS}
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
            voidPendingActionsCount,
            partiallySubmittedCount
          }) => (
            <TableRow key={`${level1Name}-${level2Name}`}>
              <TableCell>{level1Name}</TableCell>
              <TableCell>{level2Name}</TableCell>
              <StatisticCellContent
                count={partiallySubmittedCount}
                locationId={locationId}
                status={LogStatus.PARTIALLY_SUBMITTED}
                onStatisticClick={onStatisticClick}
              />
              <StatisticCellContent
                count={openCount}
                locationId={locationId}
                status={LogStatus.OPEN}
                onStatisticClick={onStatisticClick}
              />
              <StatisticCellContent
                count={pendingUpdateCount}
                locationId={locationId}
                status={LogStatus.PENDING_UPDATE}
                onStatisticClick={onStatisticClick}
              />
              <StatisticCellContent
                count={voidPendingActionsCount}
                locationId={locationId}
                status={LogStatus.VOID_PENDING_ACTIONS}
                onStatisticClick={onStatisticClick}
              />
              <StatisticCellContent
                count={
                  partiallySubmittedCount +
                  openCount +
                  pendingUpdateCount +
                  voidPendingActionsCount
                }
                locationId={locationId}
                status={LogStatus.ALL}
                onStatisticClick={onStatisticClick}
              />
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

interface StatisticCellContentProps {
  count: number;
  locationId: number;
  status: LogStatus;
  onStatisticClick: (locationId: number, status: LogStatus) => void;
}

const StatisticCellContent = ({
  count,
  onStatisticClick,
  locationId,
  status
}: StatisticCellContentProps) => {
  return (
    <TableCell textAlignment={'text-right'}>
      {count > 0 ? (
        <ButtonInline
          text={String(count)}
          handleClick={() => onStatisticClick(locationId, status)}
          color={'teal'}
        />
      ) : (
        '-'
      )}
    </TableCell>
  );
};

export default LocationList;
