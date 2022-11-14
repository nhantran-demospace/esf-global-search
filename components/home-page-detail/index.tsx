import { Block } from '@tremor/react';
import { Pagination } from 'flowbite-react';

import LogList from 'components/home-page-detail/log-list';

export default function HomePageDetail() {
  return (
    <Block marginTop="mt-6">
      <LogList />
      <Block textAlignment={'text-center'} marginTop={'mt-6'}>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <Pagination currentPage={1} totalPages={100} onPageChange={() => {}} />
      </Block>
    </Block>
  );
}
