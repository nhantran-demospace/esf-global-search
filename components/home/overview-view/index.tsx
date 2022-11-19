import { ColGrid } from '@tremor/react';

import Level0SummaryCard from 'components/home/overview-view/level0-summary-card';
import Level1DetailCard from 'components/home/overview-view/level1-detail-card';

export default function HomePageOverview() {
  return (
    <>
      <Level0SummaryCard />

      <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        <Level1DetailCard />
        <Level1DetailCard />
        <Level1DetailCard />
        <Level1DetailCard />
        <Level1DetailCard />
        <Level1DetailCard />
      </ColGrid>
    </>
  );
}
