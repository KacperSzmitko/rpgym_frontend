import { Dispatch } from 'redux'
import axios from 'axios'
import { BASE_API_URL } from '../../common/constans'
import { muscleLevelsFetched } from './muscleLevelsSlice'

export const getMuscleLevels = () => (dispach: Dispatch) => {
  axios
    .get(BASE_API_URL + 'app/muscle_levels/')
    .then((response) => {
      dispach(muscleLevelsFetched(response.data))
    })
    .catch((err) => console.log(err))
}
