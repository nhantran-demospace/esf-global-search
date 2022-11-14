import {
  Metric,
  Text,
  Title,
  BarList,
  Flex,
  Footer,
  ButtonInline
} from '@tremor/react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { dataFormatter } from 'helpers';
import { website } from 'mocks';

export default function Example() {
  return (
    <>
      <Title>Website</Title>
      <Flex
        justifyContent="justify-start"
        alignItems="items-baseline"
        spaceX="space-x-2"
      >
        <Metric>10,234</Metric>
        <Text>Total views</Text>
      </Flex>
      <Flex marginTop="mt-6">
        <Text>Pages</Text>
        <Text textAlignment="text-right">Views</Text>
      </Flex>
      <BarList data={website} valueFormatter={dataFormatter} marginTop="mt-2" />
      <Footer>
        <ButtonInline
          size="sm"
          text="View details"
          icon={ArrowRightIcon}
          iconPosition="right"
        />
      </Footer>
    </>
  );
}
