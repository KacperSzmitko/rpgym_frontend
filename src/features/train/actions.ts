import { Dispatch } from 'redux'
import axios from 'axios'
import { BASE_API_URL } from '../../common/constans'
import { currentPlanChanged } from '../userInfo/userInfoSlice'

export const startTrain = (planId: number) => (dispach: Dispatch) => {
  axios
    .post(BASE_API_URL + 'app/train/start/', { plan: planId })
    .then((response) => {
      dispach(currentPlanChanged(response.data))
    })
    .catch((err) => console.log(err))
}
