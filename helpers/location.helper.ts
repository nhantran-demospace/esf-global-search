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
  let allLevel1Locations = allLocations.filter(
    (location) =>
      location.levelInfo.atLevel === LocationLevel.LEVEL1 &&
      location.levelInfo.level0Id === level0Id
  );

  const matchingLevel0Location = { ...getLocationById(level0Id) };
  matchingLevel0Location.locationName = '-';

  // add matching level 0 as one of the locations in level 1 with location name as '-'
  allLevel1Locations = [...allLevel1Locations, matchingLevel0Location];
  return allLevel1Locations.sort((a, b) =>
    a.locationName > b.locationName
      ? 1
      : b.locationName > a.locationName
      ? -1
      : 0
  );
};

export const getLevel2Locations = (level0Id: number, level1Id: number) => {
  let allLevel2Locations = allLocations.filter(
    (location) =>
      location.levelInfo.atLevel === LocationLevel.LEVEL2 &&
      location.levelInfo.level0Id === level0Id &&
      location.levelInfo.level1Id === level1Id
  );

  const matchingLevel1Location = { ...getLocationById(level1Id) };
  matchingLevel1Location.locationName = '-';

  // add matching level 1 locations as locations in level 2 with location name as '-'
  allLevel2Locations = [...allLevel2Locations, matchingLevel1Location];
  return allLevel2Locations.sort((a, b) =>
    a.locationName > b.locationName
      ? 1
      : b.locationName > a.locationName
      ? -1
      : 0
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
      ).length,
      partiallySubmittedCount: allLogs.filter(
        (log) =>
          log.locationId === locationId &&
          log.status === LogStatus.PARTIALLY_SUBMITTED
      ).length,
      voidCount: allLogs.filter(
        (log) => log.locationId === locationId && log.status === LogStatus.VOID
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
          : getLocationById((levelInfo as Level4Info).level1Id)?.locationName ??
            '-',
      level2Name:
        levelInfo.atLevel === LocationLevel.LEVEL2
          ? locationName
          : getLocationById((levelInfo as Level4Info).level2Id)?.locationName ??
            '-',
      ...locationStatisticDictionary[locationId]
    };
    locationSummaryDtos.push(locationSummaryDto);
  });
  return locationSummaryDtos.sort((a, b) =>
    a.level1Name > b.level1Name ? 1 : b.level1Name > a.level1Name ? -1 : 0
  );
};

export const locationDictionary = buildLocationDictionary(allLocations);
export const locationStatisticDictionary = buildLocationStatisticDictionary(
  allLocations,
  allLogs
);
export const locationSummaryDtos = buildLocationSummaryDtos(allLocations);
console.log(locationSummaryDtos);
