import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/hooks'
import { getCurrentPlanAndAll } from '../userInfo/actions'
import { startTrain } from './actions'

function TrainStart () {
  const currentPlan = useAppSelector(
    (state) => state.userInfoSlice.currentPlan
  )
  const plans = useAppSelector((state) => state.planSlice.plans)
  const dispach = useAppDispatch()
  const [selectedPlan, setSelectedPlan] = useState(() => (plans.length > 0 ? plans[0].id : 0))

  useEffect(() => {
    dispach(getCurrentPlanAndAll())
  }, [])

  useEffect(() => {
    if (currentPlan !== null) {
      setSelectedPlan(currentPlan.id)
    }
  }, [currentPlan])

  return (
    <div>
      <select name="" id="" value={selectedPlan} onChange={(e) => setSelectedPlan(Number(e.target.value))} disabled={plans.length < 0}>
        {plans.map((plan, index) => (
          <option value={plan.id} key={index}>{plan.name}</option>
        ))}
      </select>
      {currentPlan !== null && currentPlan.started ? <button>Kontynuuj {currentPlan.name}</button> : null}

      <button onClick={() => { dispach(startTrain(selectedPlan)) }} disabled={selectedPlan === 0}>Rozpocznij nowy trening</button>
    </div>
  )
}

export default TrainStart
