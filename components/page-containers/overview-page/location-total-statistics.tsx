import { Block, ColGrid, Flex, Metric, Text } from '@tremor/react';

import { LogStatus } from 'models/log.model';

import { useAppSelector } from 'hooks';

import {
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids
} from 'slices/location.slice';

import { getLocationById, locationSummaryDtos } from 'helpers/location.helper';
import { LocationSummaryDto } from 'models/location.model';
import { statusesToShowOnOverview } from 'app-constants';

const getStatusTotal = (
  locationDtos: LocationSummaryDto[],
  status: LogStatus
): number => {
  return locationDtos.reduce((total, dto) => {
    switch (status) {
      case LogStatus.OPEN:
        return (total += dto.openCount);
      case LogStatus.PARTIALLY_SUBMITTED:
        return (total += dto.partiallySubmittedCount);
      case LogStatus.PENDING_UPDATE:
        return (total += dto.pendingUpdateCount);
      case LogStatus.VOID_PENDING_ACTIONS:
        return (total += dto.voidPendingActionsCount);
      case LogStatus.VOID:
      default:
        return total;
    }
  }, 0);
};

const buildTotalStatisticDictionary = (
  locationDtos: LocationSummaryDto[],
  statuses: LogStatus[]
): Record<LogStatus, number> => {
  const dict = {} as Record<LogStatus, number>;
  statuses.forEach(
    (status) => (dict[status] = getStatusTotal(locationDtos, status))
  );
  return dict;
};

const LocationTotalStatistics = () => {
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

  const totalStatistics = buildTotalStatisticDictionary(
    matchingLocationDtos,
    statusesToShowOnOverview
  );

  return (
    <ColGrid
      numColsSm={4}
      numColsLg={6}
      gapX="gap-x-6"
      gapY="gap-y-6"
      marginTop="mt-6"
    >
      {statusesToShowOnOverview.map((status) => (
        <Flex key={status} justifyContent="justify-start" spaceX="space-x-4">
          <Block truncate={true}>
            <Text>{`Total ${status}`}</Text>
            <StatusTotalValue total={totalStatistics[status]} />
          </Block>
        </Flex>
      ))}
      <Flex
        key={'grand-total'}
        justifyContent="justify-start"
        spaceX="space-x-4"
      >
        <Block truncate={true}>
          <Text>Grand Total</Text>
          <StatusTotalValue
            total={Object.values(totalStatistics).reduce(
              (sum, current) => sum + current
            )}
          />
        </Block>
      </Flex>{' '}
    </ColGrid>
  );
};

interface StatusTotalValueProps {
  total: number;
}

const StatusTotalValue = ({ total }: StatusTotalValueProps) => {
  return (
    <Metric truncate={true} color={'teal'}>
      {total > 0 ? total : '-'}
    </Metric>
  );
};

export default LocationTotalStatistics;
