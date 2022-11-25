export enum LocationLevel {
  'LEVEL0',
  'LEVEL1',
  'LEVEL2',
  'LEVEL3',
  'LEVEL4'
}

export interface Location {
  locationId: number;
  locationName: string;
  levelInfo: Level0Info | Level1Info | Level2Info | Level3Info | Level4Info;
}

export interface LevelInfo {
  atLevel: LocationLevel;
}

export interface Level0Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL0;
}

export interface Level1Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL1;
  level0Id: number;
}

export interface Level2Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL2;
  level0Id: number;
  level1Id: number;
}

export interface Level3Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL3;
  level0Id: number;
  level1Id: number;
  level2Id: number;
}

export interface Level4Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL4;
  level0Id: number;
  level1Id: number;
  level2Id: number;
  level3Id: number;
}

export type LocationDictionary = Record<number, Location>;

export interface LocationStatistic {
  openCount: number;
  pendingUpdateCount: number;
  voidPendingActionsCount: number;
  partiallySubmittedCount: number;
}

export type LocationStatisticDictionary = Record<number, LocationStatistic>;

export interface LocationSummaryDto extends LocationStatistic {
  locationId: number;
  level0Name: string;
  level1Name: string;
  level2Name: string;
}
