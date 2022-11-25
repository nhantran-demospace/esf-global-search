import Head from 'next/head';

import OverviewPageContainer from 'components/overview-page-container';
import ControlBar from 'components/control-bar';
import Header from 'components/header';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Head>
        <title>eShopFloor | Global Search | Overview</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ControlBar />
      <main className="bg-slate-50 p-8">
        <OverviewPageContainer />
      </main>
    </div>
  );
}
