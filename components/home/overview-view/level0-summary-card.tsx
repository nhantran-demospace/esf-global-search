import { ColGrid, Col, Legend, Title, Card } from '@tremor/react';

import { getLevel1Locations, getLocationById } from 'helpers/location.helper';

import { useAppSelector } from 'hooks';
import { selectSelectedLevel0Id } from 'slices/location.slice';
import { Level1Table } from './level1-table';

export default function Level0SummaryCard() {
  const selectedLevel0Id = useAppSelector(selectSelectedLevel0Id);
  const selectedLevel0Name = selectedLevel0Id
    ? getLocationById(selectedLevel0Id).locationName
    : '';
  const allLevel1Locations = selectedLevel0Id
    ? getLevel1Locations(selectedLevel0Id)
    : [];

  return (
    <Card>
      <Title>{selectedLevel0Name}</Title>
      <ColGrid numCols={3} gapX={'gap-x-4'}>
        <Col numColSpan={1}>
          <Legend
            categories={allLevel1Locations.map((level1) => level1.locationName)}
            marginTop="mt-6"
          />
        </Col>
        <Col numColSpan={2}>
          <Level1Table allLevel1Locations={allLevel1Locations} />
        </Col>
      </ColGrid>
    </Card>
  );
}
