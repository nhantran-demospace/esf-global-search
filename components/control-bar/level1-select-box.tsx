import { MultiSelectBox, MultiSelectBoxItem, Text } from '@tremor/react';

import { getLevel1Locations, getLocationById } from 'helpers/location.helper';

interface Level1SelectBoxProps {
  level0Id: number;
  onLevel1Selected: (ids: number[]) => void;
  selectedLevel1Ids: number[];
}

const Level1SelectBox = ({
  level0Id,
  onLevel1Selected,
  selectedLevel1Ids
}: Level1SelectBoxProps) => {
  const allLevel1Locations = getLevel1Locations(level0Id);
  const selectedLevel1Locations = selectedLevel1Ids.map((id) =>
    getLocationById(id)
  );

  return (
    <div>
      <Text>Level 1 location</Text>
      <MultiSelectBox
        key={`${level0Id}`}
        handleSelect={(ids) => onLevel1Selected(ids)}
        defaultValues={selectedLevel1Locations.map(
          ({ locationId }) => locationId
        )}
        placeholder={'Select level 1'}
        maxWidth={'max-w-0'}
        marginTop={'mt-2'}
      >
        {allLevel1Locations.map(
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

export default Level1SelectBox;
