import Head from 'next/head';
import { useState } from 'react';
import { Toggle, ToggleItem } from '@tremor/react';

import HomePageOverview from 'components/home-page-overview';
import HomePageDetail from 'components/home-page-detail';
import Header from 'components/header';

import { HomePageView } from 'types';

export default function Home() {
  const [selectedView, setSelectedView] = useState<HomePageView>(
    HomePageView.Overview
  );

  return (
    <div>
      <Head>
        <title>ESF Global Search</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="bg-slate-50 p-6 sm:p-10">
        <Toggle
          defaultValue={HomePageView.Overview}
          handleSelect={(value) => setSelectedView(value)}
        >
          <ToggleItem
            value={HomePageView.Overview}
            text={HomePageView.Overview}
          />
          <ToggleItem value={HomePageView.Detail} text={HomePageView.Detail} />
        </Toggle>
        {selectedView === HomePageView.Overview ? (
          <HomePageOverview />
        ) : (
          <HomePageDetail />
        )}
      </main>
    </div>
  );
}
