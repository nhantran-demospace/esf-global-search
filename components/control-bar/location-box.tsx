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
  getLevel1Locations,
  getLocationById
} from 'helpers/location.helper';

import { useAppDispatch } from 'hooks';
import {
  persistSelectedLevel0Id,
  persistSelectedLevel1Ids
} from 'slices/location.slice';

interface Level0SelectBoxProps {
  onLevel0Selected: (locationId: number) => void;
}

const Level0SelectBox = ({ onLevel0Selected }: Level0SelectBoxProps) => {
  const allLevel0Locations = getAllLevel0Locations();
  return (
    <SelectBox
      handleSelect={(locationId) => onLevel0Selected(locationId)}
      placeholder={'Select level 0'}
      maxWidth={'max-w-xs'}
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
  level0Id: number;
  onLevel1Selected: (ids: number[]) => void;
  selectedLevel1Ids: number[];
}

const Level1SelectBox = ({
  level0Id,
  onLevel1Selected,
  selectedLevel1Ids
}: Level1SelectBoxProps) => {
  const level1Locations = selectedLevel1Ids.map((id) => getLocationById(id));

  return (
    <MultiSelectBox
      key={`${level0Id}`}
      handleSelect={(locationId) => onLevel1Selected(locationId)}
      defaultValues={level1Locations.map(({ locationId }) => locationId)}
      placeholder={'Select level 1'}
      maxWidth={'max-w-xs'}
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

  const [selectedLevel0Id, setSelectedLevel0Id] = useState<
    number | undefined
  >();
  const [selectedLevel1Ids, setSelectedLevel1Ids] = useState<number[]>([]);

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
        <Level0SelectBox onLevel0Selected={onLevel0Selected} />
        <Level1SelectBox
          level0Id={selectedLevel0Id}
          onLevel1Selected={onLevel1Selected}
          selectedLevel1Ids={selectedLevel1Ids}
        />
      </Flex>
    );
  }

  return <Level0SelectBox onLevel0Selected={onLevel0Selected} />;
};

export default LocationBox;