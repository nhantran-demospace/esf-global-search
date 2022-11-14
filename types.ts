import { DeltaType } from '@tremor/react';

export enum HomePageView {
  'Overview' = 'Overview',
  'Detail' = 'Detail'
}

export interface CityData {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: DeltaType;
}
