import { useRouter } from 'next/router';
import { Toggle, ToggleItem } from '@tremor/react';

import { Page, Path } from 'enums';

export default function ViewToggle() {
  const router = useRouter();
  return (
    <Toggle
      defaultValue={router.pathname}
      handleSelect={(value) => router.push(value)}
      color={'teal'}
    >
      <ToggleItem value={Path.Overview} text={Page.Overview} />
      <ToggleItem value={Path.Detail} text={Page.Detail} />
    </Toggle>
  );
}
