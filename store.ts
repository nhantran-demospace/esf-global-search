import { configureStore } from '@reduxjs/toolkit';

import locationSlice from 'slices/location.slice';
import logListFilterSlice from 'slices/log-list-filter.slice';

export const store = configureStore({
  reducer: {
    location: locationSlice,
    logListFilter: logListFilterSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
