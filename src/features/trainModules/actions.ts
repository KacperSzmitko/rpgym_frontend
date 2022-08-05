import { Dispatch } from "redux";
import axios from "axios";
import { allModulesFetched } from "./trainModuleSlice";
import { BASE_API_URL } from "../../common/constans";

export const getAllModules = () => (dispach: Dispatch) => {
  axios
    .get(BASE_API_URL + "app/train_module/all/")
    .then((response) => {
      dispach(allModulesFetched(response.data));
    })
    .catch((err) => console.log(err));
};
