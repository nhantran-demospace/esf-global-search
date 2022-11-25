import {
  Level4Info,
  Location,
  LocationDictionary,
  LocationLevel,
  LocationStatisticDictionary,
  LocationSummaryDto
} from 'models/location.model';
import { allLocations } from 'mocks/locations.mock';
import { allLogs } from 'mocks/logs.mock';
import { Log, LogStatus } from 'models/log.model';

export const getAllLevel0Locations = () =>
  allLocations.filter(
    (location) => location.levelInfo.atLevel === LocationLevel.LEVEL0
  );

export const getLevel1Locations = (level0Id: number) => {
  return allLocations.filter(
    (location) =>
      location.levelInfo.atLevel === LocationLevel.LEVEL1 &&
      location.levelInfo.level0Id === level0Id
  );
};

export const getLevel2Locations = (level0Id: number, level1Id: number) => {
  return allLocations.filter(
    (location) =>
      location.levelInfo.atLevel === LocationLevel.LEVEL2 &&
      location.levelInfo.level0Id === level0Id &&
      location.levelInfo.level1Id === level1Id
  );
};

export const buildLocationDictionary = (
  allLocations: Location[]
): LocationDictionary => {
  const dict: LocationDictionary = {};
  allLocations.forEach((location) => {
    dict[location.locationId] = location;
  });
  return dict;
};

export const getLocationById = (locationId: number) => {
  return locationDictionary[locationId];
};

export const buildLocationStatisticDictionary = (
  allLocations: Location[],
  allLogs: Log[]
) => {
  const dict: LocationStatisticDictionary = {};
  allLocations.forEach(({ locationId }) => {
    dict[locationId] = {
      openCount: allLogs.filter(
        (log) => log.locationId === locationId && log.status === LogStatus.OPEN
      ).length,
      pendingUpdateCount: allLogs.filter(
        (log) =>
          log.locationId === locationId &&
          log.status === LogStatus.PENDING_UPDATE
      ).length,
      voidPendingActionsCount: allLogs.filter(
        (log) =>
          log.locationId === locationId &&
          log.status === LogStatus.VOID_PENDING_ACTIONS
      ).length
    };
  });
  return dict;
};

const buildLocationSummaryDtos = (
  allLocations: Location[]
): LocationSummaryDto[] => {
  const locationSummaryDtos: LocationSummaryDto[] = [];
  allLocations.forEach(({ locationId, locationName, levelInfo }) => {
    const locationSummaryDto: LocationSummaryDto = {
      locationId,
      level0Name:
        levelInfo.atLevel === LocationLevel.LEVEL0
          ? locationName
          : getLocationById(levelInfo.level0Id).locationName,
      level1Name:
        levelInfo.atLevel === LocationLevel.LEVEL1
          ? locationName
          : getLocationById((levelInfo as Level4Info).level1Id)?.locationName,
      level2Name:
        levelInfo.atLevel === LocationLevel.LEVEL2
          ? locationName
          : getLocationById((levelInfo as Level4Info).level2Id)?.locationName,
      ...locationStatisticDictionary[locationId]
    };
    locationSummaryDtos.push(locationSummaryDto);
  });
  return locationSummaryDtos.sort(
    (a, b) => Number(a.level1Name) - Number(b.level1Name)
  );
};

export const locationDictionary = buildLocationDictionary(allLocations);
export const locationStatisticDictionary = buildLocationStatisticDictionary(
  allLocations,
  allLogs
);
export const locationSummaryDtos = buildLocationSummaryDtos(allLocations);
