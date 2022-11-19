import {
  BadgeDelta,
  DonutChart,
  Dropdown,
  DropdownItem,
  Flex,
  ColGrid,
  Col,
  Legend,
  List,
  ListItem,
  Title,
  Card
} from '@tremor/react';
import { useEffect, useState } from 'react';

import { regions, cities } from 'mocks';
import { valueFormatter, filterByRegion } from 'helpers';

export default function Level0SummaryCard() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [filteredData, setFilteredData] = useState(cities);

  useEffect(() => {
    const data = cities;
    setFilteredData(filterByRegion(selectedRegion, data));
  }, [selectedRegion]);

  return (
    <Card>
      <Flex
        spaceX="space-x-8"
        justifyContent="justify-start"
        alignItems="items-center"
      >
        <Title>Sales</Title>
        <Dropdown
          handleSelect={(value) => setSelectedRegion(value)}
          placeholder="Region Selection"
        >
          {regions.map((region) => (
            <DropdownItem
              key={region.key}
              value={region.key}
              text={region.name}
            />
          ))}
        </Dropdown>
      </Flex>
      <ColGrid numCols={2}>
        <Col>
          <Legend
            categories={filteredData.map((city) => city.name)}
            marginTop="mt-6"
          />
          <DonutChart
            data={filteredData}
            category="sales"
            dataKey="name"
            valueFormatter={valueFormatter}
            height="h-72"
            marginTop="mt-6"
          />
        </Col>
        <Col>
          <List marginTop="mt-6">
            {filteredData.map((city) => (
              <ListItem key={city.name}>
                {city.name}
                <BadgeDelta
                  deltaType={city.deltaType}
                  text={city.delta}
                  size="xs"
                />
              </ListItem>
            ))}
          </List>
        </Col>
      </ColGrid>
    </Card>
  );
}
