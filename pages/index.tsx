import Head from 'next/head';
import { useState } from 'react';

import HomePageOverview from 'components/home/overview-view';
import HomePageDetail from 'components/home/detail-view';
import LocationSelectBar from 'components/home/control-bar';
import Header from 'components/header';

import { HomePageView } from 'types';

export default function Home() {
  const [selectedView, setSelectedView] = useState<HomePageView>(
    HomePageView.Overview
  );

  const onViewSelected = (view: HomePageView) => {
    setSelectedView(view);
  };

  return (
    <>
      <Head>
        <title>ESF Global Search</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <LocationSelectBar onViewSelected={onViewSelected} />
      <main className="bg-slate-50 p-6">
        {selectedView === HomePageView.Overview ? (
          <HomePageOverview />
        ) : (
          <HomePageDetail />
        )}
      </main>
    </>
  );
}
