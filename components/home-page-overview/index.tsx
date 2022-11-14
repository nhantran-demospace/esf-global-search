import { Block, Card, ColGrid } from '@tremor/react';

import AllLocationsPieChart from 'components/home-page-overview/all-locations-pie-chart';
import LocationBarList from 'components/home-page-overview/location-bar-list';

export default function HomePageOverview() {
  return (
    <>
      <Block marginTop="mt-6">
        <Card>
          <AllLocationsPieChart />
        </Card>
      </Block>

      <ColGrid numColsMd={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        <Card>
          <LocationBarList />
        </Card>
        <Card>
          <LocationBarList />
        </Card>
        <Card>
          <LocationBarList />
        </Card>
        <Card>
          <LocationBarList />
        </Card>
        <Card>
          <LocationBarList />
        </Card>
        <Card>
          <LocationBarList />
        </Card>
      </ColGrid>
    </>
  );
}
