import React from 'react'
import { TrainModuleType } from '../state/action-types/mainTypes';

export type PropsType = {
  module: TrainModuleType;
  key: number;
};

export default function TrainModule(props: PropsType) {
  return (
    <div id={`train_module_${props.key}`}>
        {props.module.current_level}
        {props.module.exercise}
        {props.module.level_weight_increase}
        {props.module.name}
        {props.module.progress}
        {props.module.reps}
        {props.module.series}
        {props.module.weight}
    </div>
  );
}
