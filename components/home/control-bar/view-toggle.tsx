import { TabList, Tab } from '@tremor/react';

import { HomePageView } from 'enums';

interface HomePageViewToggleProps {
  onViewSelected: (view: HomePageView) => void;
}

export default function ViewToggle({
  onViewSelected
}: HomePageViewToggleProps) {
  return (
    <TabList
      defaultValue={HomePageView.Overview}
      handleSelect={(value) => onViewSelected(value)}
      color={'teal'}
    >
      <Tab value={HomePageView.Overview} text={HomePageView.Overview} />
      <Tab value={HomePageView.Detail} text={HomePageView.Detail} />
    </TabList>
  );
}
