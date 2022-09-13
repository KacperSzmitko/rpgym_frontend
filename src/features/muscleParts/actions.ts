import { Dispatch } from 'redux'
import axios from 'axios'
import { BASE_API_URL } from '../../common/constans'
import { musclesTypesFetched } from './musclePartsSlice'

export const getMuscleParts = () => (dispach: Dispatch) => {
  axios
    .get(BASE_API_URL + 'app/muscle_parts/')
    .then((response) => {
      dispach(musclesTypesFetched(response.data))
    })
    .catch((err) => console.log(err))
}
