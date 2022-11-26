import { Card, Subtitle, Title } from '@tremor/react';

import { selectSelectedLevel0Id } from 'slices/location.slice';

import { useAppSelector } from 'hooks';

import { getLocationById } from 'helpers/location.helper';

import LocationList from 'components/page-containers/overview-page/location-list';
import LocationTotalStatistics from 'components/page-containers/overview-page/location-total-statistics';

export default function OverviewPageContainer() {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel0Name = selectedLevel0Id
    ? getLocationById(selectedLevel0Id).locationName
    : '';

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
      <Card>
        <Title>{selectedLevel0Name}</Title>
        <LocationTotalStatistics />
      </Card>

      <Card marginTop="mt-8">
        <LocationList />
      </Card>
    </>
  );
}
