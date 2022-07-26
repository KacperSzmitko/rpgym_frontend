import { ActionType } from "../action-types/mainTypes";
import {
  ListingInfo,
  MuscleLevelType,
  TrainModuleType,
  ExcerciseType,
  MusclePartType,
  PlanType,
} from "../action-types/mainTypes";

export interface stateType {
  muscles_levels: MuscleLevelType[];
  train_modules: TrainModuleType[];
  train_modules_info: ListingInfo;
  exercises: ExcerciseType[];
  muscles_parts: MusclePartType[];
  plans: PlanType[];
  plans_info: ListingInfo;
}

const initialState: stateType = {
  muscles_levels: [],
  train_modules: [],
  train_modules_info: {
    next: null,
    items_per_page: 3,
    last_cached_page: -1,
    count: -1,
  },
  exercises: [],
  muscles_parts: [],
  plans: [],
  plans_info: {
    next: null,
    items_per_page: 3,
    last_cached_page: -1,
    count: -1,
  },
};

const reducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ActionType.MUSCLE_LEVELS:
      return { ...state, muscles_levels: payload };
    case ActionType.GET_ALL_MODULES:
      return {
        ...state,
        train_modules: payload,
        train_modules_info: {
          ...state.train_modules_info,
          count: payload.length,
          last_cached_page: Number(
            (payload.length / state.train_modules_info.items_per_page).toFixed(
              0
            )
          ),
        },
      };
    case ActionType.CREATE_MODULE:
      return {
        ...state,
        train_modules: [payload, ...state.train_modules],
        train_modules_info: {
          ...state.train_modules_info,
          count: state.train_modules_info.count + 1,
        },
      };
    case ActionType.GET_NEXT_TRAIN_MODULES:
      return {
        ...state,
        train_modules: [
          ...state.train_modules,
          ...payload.results.filter((item: TrainModuleType) =>
            state.train_modules.indexOf(item) === -1 ? true : false
          ),
        ],
        train_modules_info: (({ next, count }) => ({
          ...state.train_modules_info,
          next,
          count,
          last_cached_page: state.train_modules_info.last_cached_page + 1,
        }))(payload),
      };
    case ActionType.DELETE_TRAIN_MODULE:
      return {
        ...state,
        train_modules: state.train_modules.filter((val) => val.id !== payload),
        train_modules_info: {
          ...state.train_modules_info,
          count: state.train_modules_info.count - 1,
        },
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
        train_modules_info: { ...state.train_modules_info, next: payload },
      };
    case ActionType.GET_NEXT_PLANS:
      return {
        ...state,
        plans: [
          ...state.plans,
          ...payload.results.filter((item: PlanType) =>
            state.plans.indexOf(item) === -1 ? true : false
          ),
        ],
        plans_info: (({ next, count }) => ({
          ...state.plans_info,
          next,
          count,
          last_cached_page: state.plans_info.last_cached_page + 1,
        }))(payload),
      };
    case ActionType.DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((val) => val.id !== payload),
        plans_info: {
          ...state.plans_info,
          count: state.plans_info.count - 1,
        },
      };
    case ActionType.UPDATE_PLAN_PAGE:
      return {
        ...state,
        plans:
          typeof payload === "undefined"
            ? state.plans
            : [...state.plans, payload],
      };
    case ActionType.SET_NEXT_PLAN_PAGE:
      return {
        ...state,
        plans_info: { ...state.plans_info, next: payload },
      };
    case ActionType.CREATE_PLAN:
      return {
        ...state,
        plans: [payload, ...state.plans],
        plans_info: {
          ...state.plans_info,
          count: state.plans_info.count + 1,
        },
      };
    case ActionType.GET_EXERCISES:
      return {
        ...state,
        exercises: payload,
      };
    case ActionType.GET_MUSCLE_PARTS:
      return {
        ...state,
        muscles_parts: payload,
      };
    default:
      return state;
  }
};

export default reducer;
