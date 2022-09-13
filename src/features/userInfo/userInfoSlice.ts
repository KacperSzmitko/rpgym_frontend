import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAction } from '@reduxjs/toolkit'
import { PlanType } from '../plans/planSlice'

const planDeleted = createAction<Number>('plans/planDeleted')
const planEdited = createAction<PlanType>('plans/planEdited')
export interface UserInfoType {
  email: string
  wieght: number
  max_cycle: number
  current_cycle: number
  currentPlan: PlanType | null
}

const initialState: UserInfoType = {
  email: '',
  wieght: 0,
  max_cycle: 0,
  current_cycle: 0,
  currentPlan: null
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    userInfoFetched (state: UserInfoType, action: PayloadAction<UserInfoType>) {
      action.payload.currentPlan = state.currentPlan
      return action.payload
    },
    currentPlanFetched (state: UserInfoType, action: PayloadAction<PlanType>) {
      state.currentPlan = action.payload
    },
    currentPlanChanged (state: UserInfoType, action: PayloadAction<PlanType>) {
      state.currentPlan = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(planDeleted, (state, action) => {
        if (
          state.currentPlan !== null &&
          state.currentPlan.id === action.payload
        ) { state.currentPlan = null }
      })
      .addCase(planEdited, (state, action: PayloadAction<PlanType>) => {
        if (
          (state.currentPlan !== null &&
          state.currentPlan.id === action.payload.id) || action.payload.cycle === state.current_cycle
        ) { state.currentPlan = action.payload }
      })
      .addDefaultCase((state, action) => {})
  }
})

export const { userInfoFetched, currentPlanFetched, currentPlanChanged } = userInfoSlice.actions
export default userInfoSlice.reducer
