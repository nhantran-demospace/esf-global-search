import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import { LogStatus } from 'models/log.model';
import { allStatuses } from 'app-constants';

interface LogListFilterState {
  statuses: LogStatus[];
}

const initialState: LogListFilterState = {
  statuses: allStatuses
};

export const logListFilterSlice = createSlice({
  name: 'logListFilter',
  initialState,
  reducers: {
    persistStatusFilter: (state, action: PayloadAction<LogStatus[]>) => {
      state.statuses = action.payload;
    },
    resetStatusFilter: (state) => {
      state.statuses = allStatuses;
    }
  }
});

export const { persistStatusFilter, resetStatusFilter } =
  logListFilterSlice.actions;

export const selectStatusFilter = (state: RootState) =>
  state.logListFilter.statuses;

export default logListFilterSlice.reducer;
