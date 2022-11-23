import { TabList, Tab, Title } from '@tremor/react';

enum Navigation {
  'eSops' = 'eSOPs',
  'eLogs' = 'eLogs',
  'Notifications' = 'Notifications',
  'GlobalSearch' = 'GlobalSearch'
}

export default function Header() {
  return (
    <div className="px-4 py-2 flex justify-between">
      <Title color={'teal'}>eShopFloor</Title>
      <TabList defaultValue={Navigation.GlobalSearch} color={'teal'}>
        <Tab text={Navigation.eSops} value={Navigation.eSops} />
        <Tab text={Navigation.eLogs} value={Navigation.eLogs} />
        <Tab text={Navigation.Notifications} value={Navigation.Notifications} />
        <Tab text={Navigation.GlobalSearch} value={Navigation.GlobalSearch} />
      </TabList>
      <div className="flex md:order-2"></div>
    </div>
  );
}
