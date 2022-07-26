import React from "react";
import { ActionType, TrainModuleType } from "../state/action-types/mainTypes";
import { deleteListItem } from "../state/actions/mainActions";
import { useAppDispatch } from "../state/hooks";

export type PropsType = {
  data: TrainModuleType;
  next: string;
};

export function TrainModule({ data, next }: PropsType) {
  const dispach = useAppDispatch();
  return (
    <div id={`train_module_`}>
      {data.name} {"  "}
      {data.current_level}
      {data.exercise}
      {data.level_weight_increase}
      {data.name}
      {data.progress}
      {data.reps}
      {data.series}
      {data.weight}
      <button
        onClick={() =>
          dispach(
            deleteListItem(
              ActionType.DELETE_TRAIN_MODULE,
              ActionType.UPDATE_MODULES_CACHE,
              ActionType.UPDATE_MODULES_PAGE,
              "app/train_module",
              next,
              data.id
            )
          )
        }
      >
        Usuń
      </button>
    </div>
  );
}

const TrainModuleMemo = React.memo(TrainModule);
export default TrainModuleMemo;
