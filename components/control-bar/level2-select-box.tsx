import { MultiSelectBox, MultiSelectBoxItem, Text } from '@tremor/react';

import { useAppSelector } from 'hooks';
import {
  selectSelectedLevel1Ids,
  selectSelectedLevel0Id
} from 'slices/location.slice';

import { getLevel2Locations } from 'helpers/location.helper';

const Level2SelectBox = () => {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const matchingLevel2Locations = selectedLevel1Ids
    .map((level1Id) => getLevel2Locations(selectedLevel0Id ?? 0, level1Id))
    .flat();

  console.log(matchingLevel2Locations);

  return (
    <div>
      <Text>Level 2 location</Text>
      <MultiSelectBox
        key={`${selectedLevel0Id}-${selectedLevel1Ids}`}
        handleSelect={() => {}}
        defaultValues={matchingLevel2Locations.map(
          (level2) => level2.locationId
        )}
        placeholder={'Select level 1'}
        maxWidth={'max-w-0'}
        marginTop={'mt-2'}
      >
        {matchingLevel2Locations.map(
          ({ locationId, locationName, levelInfo: { atLevel } }) => (
            <MultiSelectBoxItem
              key={`${locationId}-${locationName}-${atLevel}`}
              value={locationId}
              text={locationName}
            />
          )
        )}
      </MultiSelectBox>
    </div>
  );
};

export default Level2SelectBox;
