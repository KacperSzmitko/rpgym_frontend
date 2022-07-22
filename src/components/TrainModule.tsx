import React from 'react'
import { TrainModuleType } from '../state/action-types/mainTypes';
import { deleteListItem } from "../state/actions/mainActions";
import { useAppDispatch } from "../state/hooks";
export type PropsType = {
  data: TrainModuleType;
};

export function TrainModule(props: PropsType) {
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
      <button onClick={() => dispach(deleteListItem(props.data.id))}>
        Usuń
      </button>
    </div>
  );
}

const TrainModuleMemo = React.memo(TrainModule);
export default TrainModuleMemo;