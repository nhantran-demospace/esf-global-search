import Head from 'next/head';

import DetailsPageContainer from 'components/details-page-container';
import ControlBar from 'components/control-bar';
import Header from 'components/header';

export default function Home() {
  return (
    <>
      <Head>
        <title>ESF Global Search | Detail</title>
        <meta name="description" content="Demo of ESF Global Search feature" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ControlBar />
      <main className="bg-slate-50 p-6">
        <DetailsPageContainer />
      </main>
    </>
  );
}
