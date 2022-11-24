import {
  Title,
  Footer,
  ButtonInline,
  Card,
  MultiSelectBox,
  MultiSelectBoxItem,
  Flex,
  Subtitle
} from '@tremor/react';
import { isEmpty } from 'lodash';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Level1Info, Location } from 'models/location.model';
import { useState } from 'react';
import { getLevel2Locations } from 'helpers/location.helper';
import { Level2Table } from 'components/overview-page-container/level2-table';

interface level1DetailCardProps {
  level1: Location;
}

export default function Level1DetailCard({
  level1: { locationName, locationId: level1Id, levelInfo: level1Info }
}: level1DetailCardProps) {
  const [selectedLevel2Ids, setSelectedLevel2Ids] = useState<number[]>([]);

  const matchingLevel2Locations = getLevel2Locations(
    (level1Info as Level1Info)?.level0Id,
    level1Id
  );

  if (isEmpty(matchingLevel2Locations)) {
    return (
      <Card>
        <Flex justifyContent={'justify-between'}>
          <Title>{locationName}</Title>
        </Flex>
        <div className="h-full flex items-center justify-center">
          <Subtitle>No level 2 data</Subtitle>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Flex justifyContent={'justify-between'}>
        <Title>{locationName}</Title>
        <MultiSelectBox
          defaultValues={matchingLevel2Locations.map(
            (level2) => level2.locationId
          )}
          handleSelect={(value) => setSelectedLevel2Ids(value)}
          placeholder="Select Level 2"
          maxWidth="max-w-0"
        >
          {matchingLevel2Locations.map(
            ({ locationId: level2Id, locationName: level2Name }) => (
              <MultiSelectBoxItem
                key={`${level2Id}-${level2Name}`}
                value={level2Id}
                text={level2Name}
              />
            )
          )}
        </MultiSelectBox>
      </Flex>
      <Level2Table
        allLevel2Locations={matchingLevel2Locations}
        selectedLevel2Ids={selectedLevel2Ids}
      />
      <Footer>
        <ButtonInline
          size="sm"
          text="View details"
          icon={ArrowRightIcon}
          iconPosition="right"
          color={'teal'}
        />
      </Footer>
    </Card>
  );
}
