import Head from 'next/head';

import OverviewPageContainer from 'components/page-containers/overview-page';
import ControlBarAlternativeUi from 'components/control-bar';
import Header from 'components/navbar';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Head>
        <title>eShopFloor | Global Search | Overview</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <Header />
      <ControlBarAlternativeUi />
      <main className="bg-slate-50 p-6">
        <OverviewPageContainer />
      </main>
    </div>
  );
}
