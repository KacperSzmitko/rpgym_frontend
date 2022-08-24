import { Dispatch } from "redux";
import axios from "axios";
import { BASE_API_URL } from "../../common/constans";
import { userInfoFetched } from "./userInfoSlice";

export const getUserInfo = () => (dispach: Dispatch) => {
  axios
    .get(BASE_API_URL + "users/own/")
    .then((response) => {
      dispach(userInfoFetched(response.data));
    })
    .catch((err) => console.log(err));
};
