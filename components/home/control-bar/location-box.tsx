import { SelectBox, SelectBoxItem, Flex } from '@tremor/react';
import { useState } from 'react';

import {
  getAllLevel0Locations,
  getLevel1Locations
} from 'helpers/location.helper';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel0Id,
  selectSelectedLevel0Id
} from 'slices/location.slice';

interface Level0SelectBoxProps {
  onLevel0Selected: (locationId: number) => void;
}

const Level0SelectBox = ({ onLevel0Selected }: Level0SelectBoxProps) => {
  const allLevel0Locations = getAllLevel0Locations();
  return (
    <SelectBox
      handleSelect={(locationId) => onLevel0Selected(locationId)}
      defaultValue={undefined}
      placeholder={'Select level 0'}
      maxWidth={'max-w-sm'}
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
  );
};

interface Level1SelectBoxProps {
  level0: number;
  onLevel1Selected: (locationId: number) => void;
}

const Level1SelectBox = ({
  level0,
  onLevel1Selected
}: Level1SelectBoxProps) => {
  const level1Locations = getLevel1Locations(level0);

  return (
    <SelectBox
      handleSelect={(locationId) => onLevel1Selected(locationId)}
      defaultValue={undefined}
      placeholder={'Select level 1'}
      maxWidth={'max-w-sm'}
    >
      {level1Locations.map(
        ({ locationId, locationName, levelInfo: { atLevel } }) => (
          <SelectBoxItem
            key={`${locationId}-${locationName}-${atLevel}`}
            value={locationId}
            text={locationName}
          />
        )
      )}
    </SelectBox>
  );
};

const LocationBox = () => {
  const dispatch = useAppDispatch();
  const initialSelectedLevel0Id = useAppSelector(selectSelectedLevel0Id);

  const [selectedLevel0Id, setSelectedLevel0Id] = useState<number | undefined>(
    initialSelectedLevel0Id
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLevel1Id, setSelectedLevel1Id] = useState<number>();

  const onLevel0Selected = (locationId: number) => {
    setSelectedLevel0Id(locationId);
    dispatch(persistSelectedLevel0Id(locationId));
  };

  const onLevel1Selected = (locationId: number) => {
    setSelectedLevel1Id(locationId);
  };

  if (selectedLevel0Id) {
    return (
      <Flex justifyContent={'justify-start'} spaceX={'space-x-4'}>
        <Level0SelectBox onLevel0Selected={onLevel0Selected} />
        <Level1SelectBox
          level0={selectedLevel0Id}
          onLevel1Selected={onLevel1Selected}
        />
      </Flex>
    );
  }

  return <Level0SelectBox onLevel0Selected={onLevel0Selected} />;
};

export default LocationBox;
