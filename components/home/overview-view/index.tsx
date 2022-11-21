import { ColGrid } from '@tremor/react';

import { selectSelectedLevel0Id } from 'slices/location.slice';
import { useAppSelector } from 'hooks';

import Level0SummaryCard from 'components/home/overview-view/level0-summary-card';
import Level1DetailCard from 'components/home/overview-view/level1-detail-card';
import { getLevel1Locations } from 'helpers/location.helper';

export default function HomePageOverview() {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const allLevel1Locations = selectedLevel0Id
    ? getLevel1Locations(selectedLevel0Id)
    : [];

  return (
    <>
      <Level0SummaryCard />
      <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        {allLevel1Locations.map((level1) => (
          <Level1DetailCard
            key={`${level1.locationId}-${level1.locationName}`}
            level1={level1}
          />
        ))}
      </ColGrid>
    </>
  );
}
