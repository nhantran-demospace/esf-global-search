import { SelectBox, SelectBoxItem, Flex } from '@tremor/react';
import { useState } from 'react';

enum LocationLevel {
  'LEVEL0',
  'LEVEL1',
  'LEVEL2',
  'LEVEL3',
  'LEVEL4'
}

interface Location {
  locationId: number;
  locationName: string;
  levelInfo: Level0Info | Level1Info | Level2Info | Level3Info | Level4Info;
}

interface LevelInfo {
  atLevel: LocationLevel;
}

interface Level0Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL0;
}

interface Level1Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL1;
  level0Id: number;
}

interface Level2Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL2;
  level0Id: number;
  level1Id: number;
}

interface Level3Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL3;
  level0Id: number;
  level1Id: number;
  level2Id: number;
}

interface Level4Info extends LevelInfo {
  atLevel: LocationLevel.LEVEL4;
  level0Id: number;
  level1Id: number;
  level2Id: number;
  level3Id: number;
}

const allLocations: Location[] = [
  {
    locationId: 1,
    locationName: 'Singapore',
    levelInfo: {
      atLevel: LocationLevel.LEVEL0
    }
  },
  {
    locationId: 2,
    locationName: 'Brinny',
    levelInfo: {
      atLevel: LocationLevel.LEVEL0
    }
  },
  {
    locationId: 3,
    locationName: 'API',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 4,
    locationName: 'Biotech',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 5,
    locationName: 'DPI',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 6,
    locationName: 'PharmSouth',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 7,
    locationName: 'PharmWest',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 8,
    locationName: 'SCM',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 9,
    locationName: 'Warehouse',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  }
];

const getAllLevel0Locations = () =>
  allLocations.filter(
    (location) => location.levelInfo.atLevel === LocationLevel.LEVEL0
  );

const getLevel1LocationsMatchedWithLevel0 = (level0Id: number) => {
  return allLocations.filter(
    (location) =>
      location.levelInfo.atLevel === LocationLevel.LEVEL1 &&
      location.levelInfo.level0Id === level0Id
  );
};

interface Level0SelectBoxProps {
  onLevel0Selected: (locationId: number) => void;
}

const Level0SelectBox = ({ onLevel0Selected }: Level0SelectBoxProps) => {
  const allLevel0Locations = getAllLevel0Locations();
  return (
    <SelectBox
      handleSelect={(locationId) => onLevel0Selected(locationId)}
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
  const level1Locations = getLevel1LocationsMatchedWithLevel0(level0);

  return (
    <SelectBox
      handleSelect={(locationId) => onLevel1Selected(locationId)}
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
  const [selectedLevel0Id, setSelectedLevel0Id] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLevel1Id, setSelectedLevel1Id] = useState<number>();

  const onLevel0Selected = (locationId: number) => {
    setSelectedLevel0Id(locationId);
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
