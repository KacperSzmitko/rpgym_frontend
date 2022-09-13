import { Dispatch } from 'redux'
import axios from 'axios'
import { BASE_API_URL } from '../../common/constans'
import { userInfoFetched, currentPlanFetched, currentPlanChanged } from './userInfoSlice'
import { allPlansFetched } from '../plans/planSlice'
import { RootState } from '../../app/store'

export const getUserInfo = () => (dispach: Dispatch) => {
  axios
    .get(BASE_API_URL + 'users/own/')
    .then((response) => {
      dispach(userInfoFetched(response.data))
    })
    .catch((err) => console.log(err))
}

export const getCurrentPlanAndAll =
  () => (dispach: Dispatch, getState: () => RootState) => {
    axios
      .get(BASE_API_URL + 'app/plan/current')
      .then((response) => {
        if (response.status === 200) dispach(currentPlanFetched(response.data))
      })
      .catch((err) => console.log(err))
    axios
      .get(BASE_API_URL + 'app/plan/all/')
      .then((response) => {
        const allPlansCount = getState().planSlice.plans_info.count
        const currentPlansCount = getState().planSlice.plans.length
        if (allPlansCount === -1 || currentPlansCount < allPlansCount) {
          dispach(allPlansFetched(response.data))
        }
      })
      .catch((err) => console.log(err))
  }

export const startTrain = (planId: number) => (dispach: Dispatch) => {
  axios
    .post(BASE_API_URL + 'app/train/start/', planId)
    .then((response) => {
      dispach(currentPlanChanged(response.data))
    })
    .catch((err) => console.log(err))
}
