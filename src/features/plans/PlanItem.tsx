import React from 'react'
import { planEditionStatusChanged, PlanType, planDeleted, planCacheUpdated, nextPlanPageSet, TrainModulesType } from './planSlice'

import { useAppDispatch } from '../../common/hooks'
import { deleteListItem } from '../../common/actions'

export interface PropsType {
  data: PlanType
  next: string
}

export function PlanItem ({ data, next }: PropsType) {
  const dispach = useAppDispatch()
  return (
    <div id="">
      {data.id}
      {data.name}
      {data.cycle}
      {data.modules.map((val: TrainModulesType, index) => (
        <div key={index}>{val.module.name}</div>
      ))}
      <button
        onClick={() => {
          dispach(
            deleteListItem(
              planDeleted,
              planCacheUpdated,
              nextPlanPageSet,
              'app/plan',
              next,
              data.id
            )
          )
        }
        }
      >
        Usuń
      </button>
      <button onClick={() => dispach(planEditionStatusChanged(data.id))}>
        Edytuj
      </button>
    </div>
  )
}

const PlanItemMemo = React.memo(PlanItem)
export default PlanItemMemo
