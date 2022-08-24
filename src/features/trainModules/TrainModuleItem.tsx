import React from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import {
  nextModulePageSet,
  moduleDeleted,
  moduleCacheUpdated,
  TrainModuleType,
  moduleEditionStatusChanged,
} from "./trainModuleSlice";
import { deleteListItem } from "../../common/actions";

export type PropsType = {
  data: TrainModuleType;
  next: string;
};

export function TrainModule({ data, next }: PropsType) {
  const dispach = useAppDispatch();
  const exercise = useAppSelector((state) => state.exercisesSlice.exercises.find((exercise) => exercise.id === Number(data.exercise)));
  const musclePart = useAppSelector((state) => state.musclePartsSlice.muscles_parts.find((musclePart) => musclePart.id === exercise?.muscle_part));
  return (
    <div id={`train_module_`}>
      {data.name} {"  "}
      {data.current_level}
      {musclePart?.name}
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
      <button onClick={() => dispach(moduleEditionStatusChanged(data.id))}>
        Edytuj
      </button>
    </div>
  );
}

const TrainModuleMemo = React.memo(TrainModule);
export default TrainModuleMemo;
