import React from 'react'
import { MuscleLevelType } from './muscleLevelsSlice'

export interface PropsType {
  muscle: MuscleLevelType
}

export function MuscleLevel (props: PropsType) {
  return (
    <div id={props.muscle.muscle_name}>
      <div>{props.muscle.muscle_name}</div>
      <div>{props.muscle.level}</div>
      <div>{props.muscle.progress}</div>
    </div>
  )
}

export default React.memo(MuscleLevel)
