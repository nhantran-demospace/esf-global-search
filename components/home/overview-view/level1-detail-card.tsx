import {
  Title,
  Footer,
  ButtonInline,
  Card,
  MultiSelectBox,
  MultiSelectBoxItem,
  Flex
} from '@tremor/react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Level1Info, Location } from 'models/location.model';
import { useState } from 'react';
import { getLevel2Locations } from 'helpers/location.helper';
import { Level2Table } from 'components/home/overview-view/level2-table';

interface level1DetailCardProps {
  level1: Location;
}

export default function Level1DetailCard({
  level1: { locationName, locationId: level1Id, levelInfo: level1Info }
}: level1DetailCardProps) {
  const [selectedLevel2Ids, setSelectedLevel2Ids] = useState<number[]>([]);

  const allLevel2Locations = getLevel2Locations(
    (level1Info as Level1Info)?.level0Id,
    level1Id
  );

  return (
    <Card>
      <Flex justifyContent={'justify-between'}>
        <Title>{locationName}</Title>
        <MultiSelectBox
          handleSelect={(value) => setSelectedLevel2Ids(value)}
          placeholder="Select Level 2"
          maxWidth="max-w-xs"
        >
          {allLevel2Locations.map(
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
      <Level2Table allLevel2Locations={allLevel2Locations} selectedLevel2Ids={selectedLevel2Ids}/>
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
