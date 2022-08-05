import React from "react";
import { useAppDispatch } from "../../common/hooks";
import {
  nextModulePageSet,
  moduleDeleted,
  moduleCacheUpdated,
  TrainModuleType,
} from "./trainModuleSlice";
import { deleteListItem } from "../../common/actions";

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
              moduleDeleted,
              moduleCacheUpdated,
              nextModulePageSet,
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
