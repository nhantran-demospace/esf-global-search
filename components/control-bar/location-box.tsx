import { useState } from 'react';
import { Flex } from '@tremor/react';
import { isEmpty } from 'lodash';

import { getLevel1Locations } from 'helpers/location.helper';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel0Id,
  persistSelectedLevel1Ids,
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids
} from 'slices/location.slice';

import Level0SelectBox from 'components/control-bar/level0-select-box';
import Level1SelectBox from 'components/control-bar/level1-select-box';
import Level2SelectBox from 'components/control-bar/level2-select-box';

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
    dispatch(persistSelectedLevel1Ids(ids));
  };

  // show level 2 select box only if there is a level 0 and level 1 selected
  if (selectedLevel0Id && !isEmpty(selectedLevel1Ids)) {
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
        <Level2SelectBox />
      </Flex>
    );
  }

  if (selectedLevel0Id && isEmpty(selectedLevel1Ids)) {
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
