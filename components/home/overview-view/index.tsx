import { ColGrid, Title, Subtitle, Card, Flex, Block } from '@tremor/react';

import {
  selectSelectedLevel0Id,
  selectSelectedLevel1Ids
} from 'slices/location.slice';
import { useAppSelector } from 'hooks';

import Level0SummaryCard from 'components/home/overview-view/level0-summary-card';
import Level1DetailCard from 'components/home/overview-view/level1-detail-card';
import { getLevel1Locations } from 'helpers/location.helper';

export default function HomePageOverview() {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel1Ids = useAppSelector(selectSelectedLevel1Ids);
  const allLevel1Locations = selectedLevel0Id
    ? getLevel1Locations(selectedLevel0Id)
    : [];
  const selectedLevel1Locations = allLevel1Locations.filter((level1) =>
    selectedLevel1Ids.includes(level1.locationId)
  );

  if (!selectedLevel0Id) {
    return (
      <Card>
        <div className="text-center my-80">
          <Title>Select a location to start</Title>
          <Subtitle>Nothing is selected</Subtitle>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Level0SummaryCard />
      <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        {selectedLevel1Locations.map((level1) => (
          <Level1DetailCard
            key={`${level1.locationId}-${level1.locationName}`}
            level1={level1}
          />
        ))}
      </ColGrid>
    </>
  );
}
