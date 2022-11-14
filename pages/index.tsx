import Head from 'next/head';
import { useState } from 'react';
import {
    Tab,
    TabList
} from '@tremor/react';

import HomePageOverview from 'components/home-page-overview';
import HomePageDetail from 'components/home-page-detail';

enum HomePageView {
    'Overview' = 'Overview',
    'Detail' = 'Detail'
}

export default function Home() {
    const [selectedView, setSelectedView] = useState<HomePageView>(HomePageView.Overview);

    return (
    <div>
      <Head>
        <title>ESF Global Search</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <main className="bg-slate-50 p-6 sm:p-10">
            <TabList defaultValue={ HomePageView.Overview } handleSelect={ (value) => setSelectedView(value) } marginTop="mt-6">
                <Tab value={ HomePageView.Overview } text={ HomePageView.Overview } />
                <Tab value={ HomePageView.Detail } text={ HomePageView.Detail } />
            </TabList>
            { selectedView === HomePageView.Overview ? <HomePageOverview/> : <HomePageDetail/> }
        </main>
    </div>
    );
}
