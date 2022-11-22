import { Location, LocationDictionary, LocationLevel, LocationStatisticDictionary } from 'models/location.model';
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

export const buildLocationStatisticDictionary = (allLocations: Location[], allLogs: Log[]) => {
  const dict: LocationStatisticDictionary = {};
  allLocations.forEach(({locationId}) => {
    dict[locationId] = {
      openCount: allLogs.filter(log => log.locationId === locationId && log.status === LogStatus.OPEN).length,
      pendingUpdateCount: allLogs.filter(log => log.locationId === locationId && log.status === LogStatus.PENDING_UPDATE).length,
      voidPendingActionsCount: allLogs.filter(log => log.locationId === locationId && log.status === LogStatus.VOID_PENDING_ACTIONS).length,
    };
  });
  return dict;
};

export const locationDictionary = buildLocationDictionary(allLocations);
export const locationStatisticDictionary = buildLocationStatisticDictionary(allLocations, allLogs);

console.log('locationStatisticDictionary', locationStatisticDictionary);