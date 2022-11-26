import LocationBox from 'components/control-bar/location-box';
import ViewToggle from 'components/control-bar/view-toggle';

export default function ControlBar() {
  return (
    <div className="px-6 py-2 flex justify-between  bg-white">
      <LocationBox />
      <ViewToggle />
    </div>
  );
}
