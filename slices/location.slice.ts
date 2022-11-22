import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';

interface LocationState {
  selectedLevel0Id: number | undefined;
  selectedLevel1Ids: number[];
}

const initialState: LocationState = {
  selectedLevel0Id: undefined,
  selectedLevel1Ids: []
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    persistSelectedLevel0Id: (state, action: PayloadAction<number>) => {
      state.selectedLevel0Id = action.payload;
    },
    clearSelectedLevel0Id: (state) => {
      state.selectedLevel0Id = undefined;
    },
    persistSelectedLevel1Ids: (state, action: PayloadAction<number[]>) => {
      state.selectedLevel1Ids = action.payload;
    },
    clearSelectedLevel1Ids: (state) => {
      state.selectedLevel1Ids = [];
    }
  }
});

export const {
  persistSelectedLevel0Id,
  clearSelectedLevel0Id,
  persistSelectedLevel1Ids,
  clearSelectedLevel1Ids
} = locationSlice.actions;

export const selectSelectedLevel0Id = (state: RootState) =>
  state.location.selectedLevel0Id;

export const selectSelectedLevel1Ids = (state: RootState) =>
  state.location.selectedLevel1Ids;

export default locationSlice.reducer;
