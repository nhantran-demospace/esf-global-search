import { Block, Card, ColGrid } from '@tremor/react';

export default function HomePageOverview() {
  return (
    <>
      <Block marginTop="mt-6">
        <Card>
          <div className="h-80" />
        </Card>
      </Block>

      <ColGrid numColsMd={2} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
        <Card>
          <div className="h-44" />
        </Card>
        <Card>
          <div className="h-44" />
        </Card>
        <Card>
          <div className="h-44" />
        </Card>
        <Card>
          <div className="h-44" />
        </Card>
        <Card>
          <div className="h-44" />
        </Card>
        <Card>
          <div className="h-44" />
        </Card>
      </ColGrid>
    </>
  );
}
