import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';

interface LocationState {
  selectedLevel0Id: number | undefined;
  selectedLevel1Ids: number[];
  selectedLevel2Ids: number[];
}

const initialState: LocationState = {
  selectedLevel0Id: undefined,
  selectedLevel1Ids: [],
  selectedLevel2Ids: []
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
    },
    persistSelectedLevel2Ids: (state, action: PayloadAction<number[]>) => {
      state.selectedLevel2Ids = action.payload;
    },
    clearSelectedLevel2Ids: (state) => {
      state.selectedLevel2Ids = [];
    }
  }
});

export const {
  persistSelectedLevel0Id,
  clearSelectedLevel0Id,
  persistSelectedLevel1Ids,
  clearSelectedLevel1Ids,
  persistSelectedLevel2Ids,
  clearSelectedLevel2Ids
} = locationSlice.actions;

export const selectSelectedLevel0Id = (state: RootState) =>
  state.location.selectedLevel0Id;

export const selectSelectedLevel1Ids = (state: RootState) =>
  state.location.selectedLevel1Ids;

export const selectSelectedLevel2Ids = (state: RootState) =>
  state.location.selectedLevel2Ids;

export default locationSlice.reducer;
