export enum ActionType {
  MUSCLE_LEVELS = "muscle_levels",
  GET_NEXT_TRAIN_MODULES = "get_next_modules",
  UPDATE_MODULES_PAGE = "update_modules_page",
  DELETE_TRAIN_MODULE = "delete_train_module",
  UPDATE_MODULES_CACHE = "update_mod_cache",
  SET_NEXT_MODULE_PAGE = "set_module_page",
}

export interface MuscleLevelType {
  muscle_name: string;
  level: number;
  progress: number;
};

export interface TrainModuleType {
  id: number;
  exercise: string;
  name: string;
  series: number;
  weight: number;
  level_weight_increase: number;
  current_level: number;
  progress: number;
  reps: number[];
};

export interface ListingInfo {
  next: string | null;
  previous: string | null;
  items_per_page: number;
  count: number;
  last_cached_page: number;
}

export interface BaseInterface<T = any> {
  type: ActionType;
  payload: T;
}

export type Action = BaseInterface<TrainModuleType[] | ListingInfo | MuscleLevelType[] | number | null>

