import { ActionType } from "../action-types/mainTypes";
import {
  TrainModulesInfoType,
  MuscleLevelType,
  TrainModuleType,
} from "../action-types/mainTypes";

export interface stateType {
  muscles_levels: MuscleLevelType[];
  train_modules: TrainModuleType[];
  train_modules_info: TrainModulesInfoType;
}

const initialState: stateType = {
  muscles_levels: [],
  train_modules: [],
  train_modules_info: {
    count: 0,
    next: null,
    previous: null,
    current_page: 0,
    modules_per_page: 6
  },
};

const reducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ActionType.MUSCLE_LEVELS:
      return { ...state, muscles_levels: payload };
    case ActionType.GET_TRAIN_MODULES:
      return {
        ...state,
        train_modules: payload.results,
        train_modules_info: (({ previous, next, count }) => ({
          ...state.train_modules_info,
          previous,
          next,
          count,
          current_page:
            state.train_modules_info.next === next
              ? state.train_modules_info.previous === previous
                ? state.train_modules_info.current_page
                : state.train_modules_info.current_page - 1
              : state.train_modules_info.current_page - +1,
        }))(payload),
      };
    default:
      return state;
  }
};

export default reducer;
