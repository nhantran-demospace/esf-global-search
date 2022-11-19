import LocationBox from 'components/home/control-bar/location-box';
import ViewToggle from 'components/home/control-bar/view-toggle';
import { HomePageView } from 'types';

interface ControlBarProps {
  onViewSelected: (view: HomePageView) => void;
}

export default function ControlBar({ onViewSelected }: ControlBarProps) {
  return (
    <div className="px-6 py-2 flex justify-between">
      <LocationBox />
      <ViewToggle onViewSelected={onViewSelected} />
    </div>
  );
}
