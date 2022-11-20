import { ColGrid } from '@tremor/react';

import { selectSelectedLevel0Id } from 'slices/location.slice';
import { useAppSelector } from 'hooks';

import Level0SummaryCard from 'components/home/overview-view/level0-summary-card';
import Level1DetailCard from 'components/home/overview-view/level1-detail-card';
import { getLevel1LocationsMatchedWithLevel0 } from '../../../helpers/location.helper';

export default function HomePageOverview() {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const level1Locations = selectedLevel0Id
    ? getLevel1LocationsMatchedWithLevel0(selectedLevel0Id)
    : [];

  return (
    <>
      <Level0SummaryCard />
      <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        {level1Locations.map((location) => (
          <Level1DetailCard
            key={`${location.locationId}-${location.locationName}`}
            location={location}
          />
        ))}
      </ColGrid>
    </>
  );
}
