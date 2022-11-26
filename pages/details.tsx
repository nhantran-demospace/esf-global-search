import Head from 'next/head';

import DetailsPageContainer from 'components/page-containers/detail-page';
import ControlBar from 'components/control-bar';
import Header from 'components/navbar';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Head>
        <title>eShopFloor | Global Search | Detail</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <Header />
      <ControlBar />
      <main className="bg-slate-50 p-6">
        <DetailsPageContainer />
      </main>
    </div>
  );
}
