import {
  MultiSelectBox,
  MultiSelectBoxItem,
  SelectBox,
  SelectBoxItem,
  Flex
} from '@tremor/react';
import { useState } from 'react';

import {
  getAllLevel0Locations,
  getLevel1Locations
} from 'helpers/location.helper';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel0Id,
  selectSelectedLevel0Id,
  persistSelectedLevel1Ids,
  selectSelectedLevel1Ids
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
  onLevel1Selected: (ids: number[]) => void;
  selectedLevel1Ids: number[];
}

const Level1SelectBox = ({
  level0,
  onLevel1Selected
}: Level1SelectBoxProps) => {
  const level1Locations = getLevel1Locations(level0);

  return (
    <MultiSelectBox
      handleSelect={(locationId) => onLevel1Selected(locationId)}
      defaultValues={[]}
      placeholder={'Select level 1'}
      maxWidth={'max-w-sm'}
    >
      {level1Locations.map(
        ({ locationId, locationName, levelInfo: { atLevel } }) => (
          <MultiSelectBoxItem
            key={`${locationId}-${locationName}-${atLevel}`}
            value={locationId}
            text={locationName}
          />
        )
      )}
    </MultiSelectBox>
  );
};

const LocationBox = () => {
  const dispatch = useAppDispatch();
  const initialSelectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const initialSelectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);

  const [selectedLevel0Id, setSelectedLevel0Id] = useState<number | undefined>(
    initialSelectedLevel0Id
  );
  const [selectedLevel1Ids, setSelectedLevel1Ids] = useState<number[]>(
    initialSelectedLevel1Ids
  );

  const onLevel0Selected = (locationId: number) => {
    setSelectedLevel0Id(locationId);
    dispatch(persistSelectedLevel0Id(locationId));
    dispatch(
      persistSelectedLevel1Ids(
        getLevel1Locations(locationId).map(({ locationId }) => locationId)
      )
    );
  };

  const onLevel1Selected = (ids: number[]) => {
    setSelectedLevel1Ids(ids);
    dispatch(persistSelectedLevel1Ids(selectedLevel1Ids));
  };

  if (selectedLevel0Id) {
    return (
      <Flex justifyContent={'justify-start'} spaceX={'space-x-4'}>
        <Level0SelectBox onLevel0Selected={onLevel0Selected} />
        <Level1SelectBox
          level0={selectedLevel0Id}
          onLevel1Selected={onLevel1Selected}
          selectedLevel1Ids={selectedLevel1Ids}
        />
      </Flex>
    );
  }

  return <Level0SelectBox onLevel0Selected={onLevel0Selected} />;
};

export default LocationBox;
