import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../common/hooks'
import Listing from '../../common/Listing'
import CreatePlan from './CreatePlan'
import PlanItem from './PlanItem'

import { getAllModules } from '../trainModules/actions'
import { nextPlansFetched, planCreationStatusChanged } from './planSlice'
import EditPlan from './EditPlan'

export default function PlansListing () {
  const plansInfo = useAppSelector((state) => state.planSlice.plans_info)
  const plans = useAppSelector((state) => state.planSlice.plans)
  const modules = useAppSelector(
    (state) => state.trainModuleSlice.train_modules
  )
  const modulesInfo = useAppSelector(
    (state) => state.trainModuleSlice.train_modules_info
  )
  const editingActive = useAppSelector(
    (state) => state.planSlice.editing_plan_id !== 0
  )
  const creationActive = useAppSelector(
    (state) => state.planSlice.plan_creation_active
  )
  const dispach = useAppDispatch()

  useEffect(() => {
    if (modules.length < modulesInfo.count || modulesInfo.count === -1) {
      dispach(getAllModules())
    }
  }, [])

  return creationActive
    ? (
    <div>
      <CreatePlan />
    </div>
      )
    : editingActive
      ? (
    <div>
      <EditPlan />
    </div>
        )
      : (
    <div>
      <Listing
        listInfo={plansInfo}
        itemsData={plans}
        itemComponent={PlanItem}
        fetchAction={nextPlansFetched}
        path="app/plan/"
      />

      <button onClick={() => dispach(planCreationStatusChanged(true))}>
        Stwórz plan
      </button>
    </div>
        )
}
