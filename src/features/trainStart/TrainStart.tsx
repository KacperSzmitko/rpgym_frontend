import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/hooks'
import { getCurrentPlanAndAll, startTrain } from '../userInfo/actions'

function TrainStart () {
  const currentPlan = useAppSelector(
    (state) => state.userInfoSlice.currentPlan
  )
  const plans = useAppSelector((state) => state.planSlice.plans)
  const dispach = useAppDispatch()
  const [selectedPlan, setSelectedPlan] = useState(() => currentPlan === null ? (plans.length > 0 ? plans[0].id : 0) : currentPlan.id)

  useEffect(() => {
    dispach(getCurrentPlanAndAll())
  }, [])

  return (
    <div>
      <select name="" id="" defaultValue={selectedPlan} onChange={(e) => setSelectedPlan(Number(e.target.value))} disabled={plans.length < 0}>
        {plans.map((plan, index) => (
          <option value={plan.id} key={index}>{plan.name}</option>
        ))}
      </select>
      <button onClick={() => { dispach(startTrain(selectedPlan)) }} disabled={selectedPlan === 0}>Rozpocznij trening</button>
    </div>
  )
}

export default TrainStart
