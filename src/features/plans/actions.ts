import { Dispatch } from 'redux'
import axios from 'axios'
import { planCreated } from './planSlice'
import { BASE_API_URL } from '../../common/constans'

interface CreatePlanType{
  modules: number[]
  name: string
  cycle: number | null
}

export const createPlan = (data: CreatePlanType) => (dispach: Dispatch) => {
  axios
    .post(BASE_API_URL + 'app/plan/', data)
    .then((response) => {
      dispach(planCreated(response.data))
    })
    .catch((err) => console.log(err))
}
