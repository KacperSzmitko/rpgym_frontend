export enum ActionType {
  MUSCLE_LEVELS = "muscle_levels",
  GET_TRAIN_MODULES = "get_modules",
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

export interface TrainModulesInfoType {
  next: string | null;
  previous: string | null;
  count: number;
  current_page: number;
  modules_per_page: number;
}

export interface BaseInterface<T = any> {
  type: ActionType;
  payload: T;
}

export type Action =
  | BaseInterface<MuscleLevelType[]>
  | BaseInterface<TrainModuleType[]>
  | BaseInterface<TrainModulesInfoType>;
