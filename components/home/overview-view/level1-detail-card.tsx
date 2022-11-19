import { Title, Footer, ButtonInline, Card } from '@tremor/react';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function Example() {
  return (
    <Card>
      <Title>Level 1</Title>
      <Footer>
        <ButtonInline
          size="sm"
          text="View details"
          icon={ArrowRightIcon}
          iconPosition="right"
          color={'teal'}
        />
      </Footer>
    </Card>
  );
}
