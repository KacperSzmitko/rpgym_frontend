import React from 'react'
import { MusclePartType } from '../muscleParts/musclePartsSlice'

interface propsType {
  trainModuleId: Number
  muscleParts: MusclePartType[]
}

function PlanModuleInput ({ trainModuleId, muscleParts }: propsType) {
  return <div>PlanModuleInput</div>
}

export default PlanModuleInput
