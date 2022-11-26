import { SelectBox, SelectBoxItem, Text } from '@tremor/react';

import { getAllLevel0Locations } from 'helpers/location.helper';

interface Level0SelectBoxProps {
  selectedLevel0Id: number | undefined;
  onLevel0Selected: (locationId: number) => void;
}

const Level0SelectBox = ({
  onLevel0Selected,
  selectedLevel0Id
}: Level0SelectBoxProps) => {
  const allLevel0Locations = getAllLevel0Locations();
  return (
    <div>
      <Text>Level 0 location</Text>
      <SelectBox
        defaultValue={selectedLevel0Id}
        handleSelect={(locationId) => onLevel0Selected(locationId)}
        maxWidth={'max-w-0'}
        marginTop={'mt-2'}
      >
        {allLevel0Locations.map(
          ({ locationId, locationName, levelInfo: { atLevel } }) => (
            <SelectBoxItem
              key={`${locationId}-${locationName}-${atLevel}`}
              value={locationId}
              text={locationName}
            />
          )
        )}
      </SelectBox>
    </div>
  );
};

export default Level0SelectBox;
