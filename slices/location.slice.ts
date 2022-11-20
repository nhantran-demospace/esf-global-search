import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from 'store';

interface LocationState {
  selectedLevel0Id: number | undefined;
}

const initialState: LocationState = {
  selectedLevel0Id: undefined
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
    }
  }
});

export const { persistSelectedLevel0Id, clearSelectedLevel0Id } =
  locationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedLevel0Id = (state: RootState) =>
  state.location.selectedLevel0Id;

export default locationSlice.reducer;
