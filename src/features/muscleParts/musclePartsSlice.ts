import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface MusclePartType {
  id: number;
  name: string;
}

export interface MusclePartsState {
  muscles_parts: MusclePartType[];
}

const initialState = { muscles_parts: [] } as MusclePartsState;

const counterSlice = createSlice({
  name: "muscleParts",
  initialState,
  reducers: {
    musclesTypesFetched: (
      state: MusclePartsState,
      action: PayloadAction<MusclePartType[]>
    ) => {
      state.muscles_parts = action.payload;
    },
  },
});

export const { musclesTypesFetched } = counterSlice.actions;
export default counterSlice.reducer;

