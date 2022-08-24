import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ListingInfo } from "../../common/types";

export interface TrainModuleType {
  id: number;
  exercise: number;
  muscle_part_id: number;
  name: string;
  series: number;
  weight: number;
  level_weight_increase: number;
  current_level: number;
  progress: number;
  reps: number[];
}

export interface TrainModulesListing {
  results: TrainModuleType[];
  next: string;
  count: number;
}

export interface TrainModulesType {
  train_modules: TrainModuleType[];
  train_modules_info: ListingInfo;
  editing_module_id: number;
  module_creation_active: boolean;
}

const initialState = {
  train_modules: [],
  train_modules_info: {
    next: null,
    items_per_page: 3,
    last_cached_page: -1,
    count: -1,
  },
  editing_module_id: 0,
  module_creation_active: false,
} as TrainModulesType;

const trainModuleSlice = createSlice({
  name: "trainModules",
  initialState,
  reducers: {
    allModulesFetched(
      state: TrainModulesType,
      action: PayloadAction<TrainModuleType[]>
    ) {
      state.train_modules = action.payload;
      state.train_modules_info.count = action.payload.length;
      state.train_modules_info.last_cached_page = Number(
        (
          action.payload.length / state.train_modules_info.items_per_page
        ).toFixed(0)
      );
      state.train_modules_info.next = null;
    },
    moduleCreated(
      state: TrainModulesType,
      action: PayloadAction<TrainModuleType>
    ) {
      state.train_modules = [action.payload, ...state.train_modules];
      state.train_modules_info.count += 1;
    },
    nextModulesFetched(
      state: TrainModulesType,
      action: PayloadAction<TrainModulesListing>
    ) {
      state.train_modules = [
        ...state.train_modules,
        ...action.payload.results.filter((item: TrainModuleType) =>
          state.train_modules.indexOf(item) === -1 ? true : false
        ),
      ];
      state.train_modules_info = (({ next, count }) => ({
        ...state.train_modules_info,
        next,
        count,
        last_cached_page: state.train_modules_info.last_cached_page + 1,
      }))(action.payload);
    },
    moduleDeleted(state: TrainModulesType, action: PayloadAction<Number>) {
      state.train_modules = state.train_modules.filter(
        (val) => val.id !== action.payload
      );
      state.train_modules_info.count -= 1;
    },
    moduleCacheUpdated(
      state: TrainModulesType,
      action: PayloadAction<TrainModuleType>
    ) {
      state.train_modules =
        typeof action.payload === "undefined"
          ? state.train_modules
          : [...state.train_modules, action.payload];
    },
    nextModulePageSet(state: TrainModulesType, action: PayloadAction<string>) {
      state.train_modules_info.next = action.payload;
    },
    moduleEdited(
      state: TrainModulesType,
      action: PayloadAction<TrainModuleType>
    ) {
      const updatedModuleIndex = state.train_modules.findIndex(
        (module) => module.id === action.payload.id
      );
      if (updatedModuleIndex !== -1){
        state.train_modules[updatedModuleIndex] = action.payload;
      }
      state.editing_module_id = 0;
    },
    moduleCreationStatusChanged(
      state: TrainModulesType,
      action: PayloadAction<boolean>
    ) {
      state.module_creation_active = action.payload;
    },
    moduleEditionStatusChanged(
      state: TrainModulesType,
      action: PayloadAction<number>
    ) {
      state.editing_module_id = action.payload;
    },
  },
});

export const {
  allModulesFetched,
  moduleCreated,
  nextModulesFetched,
  moduleDeleted,
  moduleCacheUpdated,
  nextModulePageSet,
  moduleEdited,
  moduleCreationStatusChanged,
  moduleEditionStatusChanged,
} = trainModuleSlice.actions;
export default trainModuleSlice.reducer;
