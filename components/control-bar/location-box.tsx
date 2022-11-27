import { useState, useRef } from 'react';
import { Flex } from '@tremor/react';
import { isEmpty } from 'lodash';

import {
  getLevel1Locations,
  getLevel2Locations
} from 'helpers/location.helper';

import { useAppDispatch, useAppSelector } from 'hooks';
import {
  persistSelectedLevel0Id,
  persistSelectedLevel1Ids,
  persistSelectedLevel2Ids,
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids,
  selectSelectedLevel2Ids
} from 'slices/location.slice';

import Level0SelectBox from 'components/control-bar/level0-select-box';
import Level1SelectBox from 'components/control-bar/level1-select-box';
import Level2SelectBox from 'components/control-bar/level2-select-box';

const LocationBox = () => {
  const dispatch = useAppDispatch();
  const initialSelectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const initialSelectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const initialSelectedLevel2Ids = useAppSelector(selectSelectedLevel2Ids);

  const [selectedLevel0Id, setSelectedLevel0Id] = useState<number | undefined>(
    initialSelectedLevel0Id
  );
  const [selectedLevel1Ids, setSelectedLevel1Ids] = useState<number[]>(
    initialSelectedLevel1Ids
  );
  const [selectedLevel2Ids, setSelectedLevel2Ids] = useState<number[]>(
    initialSelectedLevel2Ids
  );

  const previousSelectedLevel0Id = useRef<number | undefined>(selectedLevel0Id);

  const onLevel0Selected = (level0Id: number) => {
    if (previousSelectedLevel0Id.current === level0Id) return;
    previousSelectedLevel0Id.current = level0Id;

    const matchingLevel1Ids = getLevel1Locations(level0Id).map(
      (level1) => level1.locationId
    );
    const matchingLevel2Ids = matchingLevel1Ids
      .map((level1Id) =>
        getLevel2Locations(level0Id, level1Id).map(
          (level2) => level2.locationId
        )
      )
      .flat();

    setSelectedLevel0Id(level0Id);
    setSelectedLevel1Ids(matchingLevel1Ids);
    setSelectedLevel2Ids(matchingLevel2Ids);
    dispatch(persistSelectedLevel0Id(level0Id));
    dispatch(persistSelectedLevel1Ids(matchingLevel1Ids));
    dispatch(persistSelectedLevel2Ids(matchingLevel2Ids));
  };

  const onLevel1Selected = (level1Ids: number[]) => {
    const matchingLevel2Ids = level1Ids
      .map((level1Id) =>
        getLevel2Locations(selectedLevel0Id ?? 0, level1Id).map(
          (level2) => level2.locationId
        )
      )
      .flat();
    setSelectedLevel1Ids(level1Ids);
    setSelectedLevel2Ids(matchingLevel2Ids);
    dispatch(persistSelectedLevel1Ids(level1Ids));
    dispatch(persistSelectedLevel2Ids(matchingLevel2Ids));
  };

  const onLevel2Selected = (level2Ids: number[]) => {
    setSelectedLevel2Ids(level2Ids);
    dispatch(persistSelectedLevel2Ids(level2Ids));
  };

  const showLevel0AndLevel1Box =
    (selectedLevel0Id && isEmpty(selectedLevel1Ids)) ||
    (selectedLevel0Id &&
      selectedLevel1Ids.length === 1 &&
      selectedLevel1Ids[0] === selectedLevel0Id);

  if (showLevel0AndLevel1Box) {
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

  const showLevel0AndLevel1AndLevel2Box =
    selectedLevel0Id && !isEmpty(selectedLevel1Ids);

  // show level 2 select box only if level 0 and level 1 are selected
  // number of selected level 1 must be more than 1 or 1 and not '-'
  if (showLevel0AndLevel1AndLevel2Box) {
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
        <Level2SelectBox
          level0Id={selectedLevel0Id}
          level1Ids={selectedLevel1Ids}
          onLevel2Selected={onLevel2Selected}
          selectedLevel2Ids={selectedLevel2Ids}
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
