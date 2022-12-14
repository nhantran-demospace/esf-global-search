import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import {
  ButtonInline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react';
import { clsx } from 'clsx';

import { getLocationById, locationSummaryDtos } from 'helpers/location.helper';
import { LogStatus } from 'models/log.model';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel0Id,
  persistSelectedLevel1Ids,
  persistSelectedLevel2Ids,
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids,
  selectSelectedLevel2Ids
} from 'slices/location.slice';
import { persistStatusFilter } from 'slices/log-list-filter.slice';
import { Path } from 'enums';
import { LocationLevel } from 'models/location.model';

const tableClasses = clsx(
  '[&>div>table>tbody>tr>td]:!pb-2',
  '[&>div>table>tbody>tr>td]:!pt-2'
);

const LocationList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const selectedLevel2Ids = useAppSelector(selectSelectedLevel2Ids);

  const matchingLocationDtos = locationSummaryDtos.filter(({ locationId }) =>
    !isEmpty(selectedLevel2Ids)
      ? selectedLevel2Ids.includes(locationId)
      : !isEmpty(selectedLevel1Ids)
      ? selectedLevel1Ids.includes(locationId)
      : selectedLevel0Id === locationId
  );

  const onStatisticClick = (locationId: number, status: LogStatus) => {
    if (status === LogStatus.ALL) {
      dispatch(
        persistStatusFilter([
          LogStatus.PARTIALLY_SUBMITTED,
          LogStatus.OPEN,
          LogStatus.PENDING_UPDATE,
          LogStatus.VOID_PENDING_ACTIONS,
          LogStatus.VOID,
          LogStatus.COMPLETED
        ])
      );
    } else {
      dispatch(persistStatusFilter([status]));
    }

    const { levelInfo } = getLocationById(locationId);
    const atLevel = levelInfo.atLevel;

    if (atLevel === LocationLevel.LEVEL0) {
      dispatch(persistSelectedLevel0Id(locationId));
      dispatch(persistSelectedLevel1Ids([]));
      dispatch(persistSelectedLevel2Ids([]));
    }

    if (atLevel === LocationLevel.LEVEL1) {
      dispatch(persistSelectedLevel0Id(levelInfo.level0Id));
      dispatch(persistSelectedLevel1Ids([locationId]));
      dispatch(persistSelectedLevel1Ids(selectedLevel2Ids));
    }

    if (atLevel === LocationLevel.LEVEL2) {
      dispatch(persistSelectedLevel0Id(levelInfo.level0Id));
      dispatch(persistSelectedLevel1Ids([levelInfo.level1Id]));
      dispatch(persistSelectedLevel2Ids([locationId]));
    }

    router.push(`${Path.Detail}`);
  };

  return (
    <div className={tableClasses}>
      <Table marginTop={'mt-2'}>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Level 0</TableHeaderCell>
            <TableHeaderCell>Level 1</TableHeaderCell>
            <TableHeaderCell>Level 2</TableHeaderCell>
            <TableHeaderCell textAlignment={'text-left'}>
              {LogStatus.PARTIALLY_SUBMITTED}
            </TableHeaderCell>
            <TableHeaderCell textAlignment={'text-left'}>
              {LogStatus.OPEN}
            </TableHeaderCell>
            <TableHeaderCell textAlignment={'text-left'}>
              {LogStatus.PENDING_UPDATE}
            </TableHeaderCell>
            <TableHeaderCell textAlignment={'text-left'}>
              {LogStatus.VOID}
            </TableHeaderCell>
            <TableHeaderCell textAlignment={'text-left'}>
              {LogStatus.VOID_PENDING_ACTIONS}
            </TableHeaderCell>
            <TableHeaderCell textAlignment={'text-left'}>
              All Statuses Total
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {matchingLocationDtos.map(
            ({
              locationId,
              level0Name,
              level1Name,
              level2Name,
              openCount,
              pendingUpdateCount,
              voidPendingActionsCount,
              voidCount,
              partiallySubmittedCount
            }) => (
              <TableRow key={`${level1Name}-${level2Name}`}>
                <TableCell>{level0Name}</TableCell>
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
                  count={voidCount}
                  locationId={locationId}
                  status={LogStatus.VOID}
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
                    voidCount +
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
    </div>
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
    <TableCell textAlignment={'text-left'}>
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
