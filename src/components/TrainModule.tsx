import React from 'react'
import { TrainModuleType } from '../state/action-types/mainTypes';
import { deleteTrainModule } from '../state/actions/mainActions';
import { useAppDispatch } from "../state/hooks";
export type PropsType = {
  data: TrainModuleType;
};

export default function TrainModule(props: PropsType) {
  const dispach = useAppDispatch();
  return (
    <div id={`train_module_`}>
      {props.data.name} {"  "}
      {props.data.current_level}
      {props.data.exercise}
      {props.data.level_weight_increase}
      {props.data.name}
      {props.data.progress}
      {props.data.reps}
      {props.data.series}
      {props.data.weight}
      <button onClick={() => dispach(deleteTrainModule(props.data.id))}>
        Usuń
      </button>
    </div>
  );
}
