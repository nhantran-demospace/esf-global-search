import { DeltaType } from '@tremor/react';

export interface CityData {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: DeltaType;
}
