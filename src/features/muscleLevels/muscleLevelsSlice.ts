import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MuscleLevelType {
  muscle_name: string;
  level: number;
  progress: number;
}

export interface MuscleLevelsType {
  muscles_levels: MuscleLevelType[];
}

const initialState = { muscles_levels: [] } as MuscleLevelsType;

const counterSlice = createSlice({
  name: "muscleLevels",
  initialState,
  reducers: {
    muscleLevelsFetched(
      state: MuscleLevelsType,
      action: PayloadAction<MuscleLevelType[]>
    ) {
      state.muscles_levels = action.payload;
    },
  },
});

export const { muscleLevelsFetched } = counterSlice.actions;
export default counterSlice.reducer;
