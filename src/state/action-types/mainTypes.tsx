export enum ActionType {
  MUSCLE_LEVELS = "muscle_levels",

  GET_EXERCISES = "get_exercises",
  GET_MUSCLE_PARTS = "get_muscles",

  GET_ALL_MODULES = "get_all_modules",
  GET_NEXT_TRAIN_MODULES = "get_next_modules",
  UPDATE_MODULES_PAGE = "update_modules_page",
  DELETE_TRAIN_MODULE = "delete_train_module",
  UPDATE_MODULES_CACHE = "update_mod_cache",
  SET_NEXT_MODULE_PAGE = "set_module_page",
  CREATE_MODULE = "create_train_module",

  GET_NEXT_PLANS = "get_next_plans",
  UPDATE_PLAN_PAGE = "update_plan_page",
  DELETE_PLAN = "delete_plan",
  UPDATE_PLAN_CACHE = "update_plan_cache",
  SET_NEXT_PLAN_PAGE = "set_plan_page",
  CREATE_PLAN = "create_plan",
}

export interface MusclePartType {
  id: number;
  name: string;
}

export interface ExcerciseType {
  id: number;
  muscle_part: number;
  name: string;
  max_weight: number;
}

export interface MuscleLevelType {
  muscle_name: string;
  level: number;
  progress: number;
}

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
}

export interface PlanType {
  id: number;
  cycle: number | null;
  name: string;
  modules: TrainModuleType[];
}

export interface ListingInfo {
  next: string | null;
  items_per_page: number;
  last_cached_page: number;
  count: number;
}

export interface BaseInterface<T = any> {
  type: ActionType;
  payload: T;
}

export type Action = BaseInterface<
  | TrainModuleType[]
  | ListingInfo
  | MuscleLevelType[]
  | ExcerciseType[]
  | MusclePartType[]
  | number
  | null
  | PlanType
>;
