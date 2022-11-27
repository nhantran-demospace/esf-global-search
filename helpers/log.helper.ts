import { allLogs } from 'mocks/logs.mock';
import { allForms } from 'mocks/forms.mock';
import { Level4Info, LocationLevel } from 'models/location.model';
import { LogSummaryDto } from 'models/log.model';
import { locationDictionary, getLocationById } from 'helpers/location.helper';

const buildLogSummaryDtos = (): LogSummaryDto[] => {
  const logSummaryDtos: LogSummaryDto[] = [];
  allLogs.forEach(
    ({
      logId,
      formId,
      status,
      locationId,
      submittedDate,
      performedBySignatures
    }) => {
      const { levelInfo } = locationDictionary[locationId];
      const level2Id =
        levelInfo.atLevel === LocationLevel.LEVEL2
          ? locationId
          : (levelInfo as Level4Info).level2Id;
      const level1Id =
        levelInfo.atLevel === LocationLevel.LEVEL1
          ? locationId
          : (levelInfo as Level4Info).level1Id;
      const level0Id =
        levelInfo.atLevel === LocationLevel.LEVEL0
          ? locationId
          : (levelInfo as Level4Info).level0Id;
      const level0Name = getLocationById(level0Id)?.locationName;
      const level1Name = getLocationById(level1Id)?.locationName;
      const level2Name = getLocationById(level2Id)?.locationName;
      const form = allForms.find((form) => form.formId === formId);

      const logSummaryDto: LogSummaryDto = {
        locationId,
        logId,
        formId,
        formVersion: form ? form.formVersion : 0,
        formName: form ? form.formName : '',
        status,
        submittedDate,
        performedBySignatures,
        level0: level0Name ?? '-',
        level1: level1Name ?? '-',
        level2: level2Name ?? '-'
      };
      logSummaryDtos.push(logSummaryDto);
    }
  );
  return logSummaryDtos;
};

export const logSummaryDtos = buildLogSummaryDtos();
console.log(logSummaryDtos);
