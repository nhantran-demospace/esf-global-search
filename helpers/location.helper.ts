import {
  Location,
  LocationDictonary,
  LocationLevel
} from 'models/location.model';
import { allLocations } from 'mocks/locations.mock';

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

const buildLocationDictionary = (
  allLocations: Location[]
): LocationDictonary => {
  const dict: LocationDictonary = {};
  allLocations.forEach((location) => {
    dict[location.locationId] = location;
  });
  return dict;
};

const locationDictionary = buildLocationDictionary(allLocations);

export const getLocationById = (locationId: number) => {
  return locationDictionary[locationId];
};
