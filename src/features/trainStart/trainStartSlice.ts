import { createSlice, createAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlanType } from "../plans/planSlice";

const planDeleted = createAction<Number>("plans/planDeleted");

interface TrainStartType {
  currentPlan: PlanType | null;
}

const initialState = {
  currentPlan: null,
} as TrainStartType;

const counterSlice = createSlice({
  name: "trains",
  initialState,
  reducers: {
    currentPlanFetched(state: TrainStartType, action: PayloadAction<PlanType>) {
      state.currentPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(planDeleted, (state, action) => {
        console.log("here");
        if (state.currentPlan !== null && state.currentPlan.id === action.payload) state.currentPlan = null;
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { currentPlanFetched } = counterSlice.actions;
export default counterSlice.reducer;
