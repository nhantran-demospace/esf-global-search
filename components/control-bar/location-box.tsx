import {
  MultiSelectBox,
  MultiSelectBoxItem,
  SelectBox,
  SelectBoxItem,
  Flex,
  Text
} from '@tremor/react';
import { useState } from 'react';

import {
  getAllLevel0Locations,
  getLevel1Locations,
  getLocationById
} from 'helpers/location.helper';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel0Id,
  persistSelectedLevel1Ids,
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids
} from 'slices/location.slice';

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
        handleSelect={(locationId) => onLevel1Selected(locationId)}
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

  const onLevel0Selected = (level0Id: number) => {
    setSelectedLevel0Id(level0Id);
    setSelectedLevel1Ids(
      getLevel1Locations(level0Id).map((level1) => level1.locationId)
    );
    dispatch(persistSelectedLevel0Id(level0Id));
    dispatch(
      persistSelectedLevel1Ids(
        getLevel1Locations(level0Id).map((level1) => level1.locationId)
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
        <Level0SelectBox
          onLevel0Selected={onLevel0Selected}
          selectedLevel0Id={selectedLevel0Id}
        />
        <Level1SelectBox
          level0Id={selectedLevel0Id}
          onLevel1Selected={onLevel1Selected}
          selectedLevel1Ids={selectedLevel1Ids}
        />
      </Flex>
    );
  }

  return (
    <Level0SelectBox
      onLevel0Selected={onLevel0Selected}
      selectedLevel0Id={selectedLevel0Id}
    />
  );
};

export default LocationBox;
