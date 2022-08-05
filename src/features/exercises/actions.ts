import { Dispatch } from "redux";
import axios from "axios";
import { BASE_API_URL } from "../../common/constans";
import { exercisesFetched } from "./exercisesSlice";

export const getExercises = () => (dispach: Dispatch) => {
  axios
    .get(BASE_API_URL + "app/exercises/")
    .then((response) => {
      dispach(exercisesFetched(response.data));
    })
    .catch((err) => console.log(err));
};
