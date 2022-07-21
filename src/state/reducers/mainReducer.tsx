import { ActionType } from "../action-types/mainTypes";
import {
  ListingInfo,
  MuscleLevelType,
  TrainModuleType,
} from "../action-types/mainTypes";

export interface stateType {
  muscles_levels: MuscleLevelType[];
  train_modules: TrainModuleType[];
  train_modules_info: ListingInfo;
}

const initialState: stateType = {
  muscles_levels: [],
  train_modules: [],
  train_modules_info: {
    next: null,
    previous: null,
    items_per_page: 3,
    count: 0,
    last_cached_page: -1,
  },
};

const reducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ActionType.MUSCLE_LEVELS:
      return { ...state, muscles_levels: payload };
    case ActionType.GET_NEXT_TRAIN_MODULES:
      return {
        ...state,
        train_modules: [...state.train_modules, ...payload.results],
        train_modules_info: (({ previous, next, count }) => ({
          ...state.train_modules_info,
          previous,
          next,
          count,
          last_cached_page: state.train_modules_info.last_cached_page + 1,
        }))(payload),
      };
    case ActionType.DELETE_TRAIN_MODULE:
      return {
        ...state,
        train_modules: state.train_modules.filter((val) => val.id !== payload),
      };
    case ActionType.UPDATE_MODULES_CACHE:
      return {
        ...state,
        train_modules:
          typeof payload === "undefined"
            ? state.train_modules
            : [...state.train_modules, payload],
      };
    case ActionType.SET_NEXT_MODULE_PAGE:
      return {
        ...state,
        train_modules_info: {...state.train_modules_info, next: payload}
      };
    default:
      return state;
  }
};

export default reducer;
