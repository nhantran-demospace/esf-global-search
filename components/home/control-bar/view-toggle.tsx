import { Toggle, ToggleItem } from '@tremor/react';

import { HomePageView } from 'enums';

interface HomePageViewToggleProps {
  onViewSelected: (view: HomePageView) => void;
}

export default function ViewToggle({
  onViewSelected
}: HomePageViewToggleProps) {
  return (
    <Toggle
      defaultValue={HomePageView.Overview}
      handleSelect={(value) => onViewSelected(value)}
      color={'teal'}
    >
      <ToggleItem value={HomePageView.Overview} text={HomePageView.Overview} />
      <ToggleItem value={HomePageView.Detail} text={HomePageView.Detail} />
    </Toggle>
  );
}
