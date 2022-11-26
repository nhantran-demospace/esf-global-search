import { MultiSelectBox, MultiSelectBoxItem, Text } from '@tremor/react';

import { useAppSelector } from 'hooks';
import {
  selectSelectedLevel1Ids,
  selectSelectedLevel0Id
} from 'slices/location.slice';

import { getLevel2Locations } from 'helpers/location.helper';

interface Level2SelectBoxProps {
  level0Id: number;
  level1Ids: number[];
  onLevel2Selected: (ids: number[]) => void;
  selectedLevel2Ids: number[];
}

const Level2SelectBox = ({
  onLevel2Selected,
  selectedLevel2Ids
}: Level2SelectBoxProps) => {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const allLevel2Locations = selectedLevel1Ids
    .map((level1Id) => getLevel2Locations(selectedLevel0Id ?? 0, level1Id))
    .flat();

  return (
    <div>
      <Text>Level 2 location</Text>
      <MultiSelectBox
        key={`${selectedLevel0Id}-${selectedLevel1Ids}`}
        handleSelect={(ids) => onLevel2Selected(ids)}
        defaultValues={selectedLevel2Ids}
        placeholder={'Select level 2'}
        maxWidth={'max-w-0'}
        marginTop={'mt-2'}
      >
        {allLevel2Locations.map(
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
