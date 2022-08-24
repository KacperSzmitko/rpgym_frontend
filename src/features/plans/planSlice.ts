import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TrainModuleType } from "../trainModules/trainModuleSlice";
import { ListingInfo } from "../../common/types";

export interface PlanType {
  id: number;
  cycle: number | null;
  name: string;
  modules: TrainModuleType[];
}

export interface PlanListing {
  results: PlanType[];
  next: string;
  count: number;
}

export interface PlansType {
  plans: PlanType[];
  plans_info: ListingInfo;
  editing_plan_id: number;
  plan_creation_active: boolean;
}

const initialState = {
  plans: [],
  plans_info: {
    next: null,
    items_per_page: 3,
    last_cached_page: -1,
    count: -1,
  },
  editing_plan_id: 0,
  plan_creation_active: false,
} as PlansType;

const counterSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    planCreated(state: PlansType, action: PayloadAction<PlanType>) {
      state.plans = [action.payload, ...state.plans];
      state.plans_info.count += 1;
    },
    nextPlansFetched(state: PlansType, action: PayloadAction<PlanListing>) {
      state.plans = [
        ...state.plans,
        ...action.payload.results.filter((item: PlanType) =>
          state.plans.indexOf(item) === -1 ? true : false
        ),
      ];
      state.plans_info = (({ next, count }) => ({
        ...state.plans_info,
        next,
        count,
        last_cached_page: state.plans_info.last_cached_page + 1,
      }))(action.payload);
    },
    planDeleted(state: PlansType, action: PayloadAction<Number>) {
      state.plans = state.plans.filter((val) => val.id !== action.payload);
      state.plans_info.count -= 1;
    },
    planCacheUpdated(state: PlansType, action: PayloadAction<PlanType>) {
      state.plans =
        typeof action.payload === "undefined"
          ? state.plans
          : [...state.plans, action.payload];
    },
    nextPlanPageSet(state: PlansType, action: PayloadAction<string>) {
      state.plans_info.next = action.payload;
    },
    planCreationStatusChanged(
      state: PlansType,
      action: PayloadAction<boolean>
    ) {
      state.plan_creation_active = action.payload;
    },
    planEditionStatusChanged(
      state: PlansType,
      action: PayloadAction<number>
    ) {
      state.editing_plan_id = action.payload;
    },
  },
});

export const {
  planCreated,
  nextPlansFetched,
  planDeleted,
  planCacheUpdated,
  nextPlanPageSet,
  planCreationStatusChanged,
  planEditionStatusChanged,
} = counterSlice.actions;
export default counterSlice.reducer;
