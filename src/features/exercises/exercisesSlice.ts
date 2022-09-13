import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ExcerciseType {
  id: number
  muscle_part: number
  name: string
  max_weight: number
}

export interface ExercisesState {
  exercises: ExcerciseType[]
}

const initialState = { exercises: [] } as ExercisesState

const counterSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    exercisesFetched (
      state: ExercisesState,
      action: PayloadAction<ExcerciseType[]>
    ) {
      state.exercises = action.payload
    }
  }
})

export const { exercisesFetched } = counterSlice.actions
export default counterSlice.reducer
