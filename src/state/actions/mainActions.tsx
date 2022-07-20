import { Dispatch } from "redux";
import axios from "axios";
import { BASE_API_URL } from "../../constans";
import { Action, ActionType } from "../action-types/mainTypes";
import { string } from "prop-types";

export const getMuscleLevels = () => (dispach: Dispatch<Action>) => {
  axios
    .get(BASE_API_URL + "app/muscle_levels/")
    .then((response) => {
      dispach({ type: ActionType.MUSCLE_LEVELS, payload: response.data });
    })
    .catch((err) => console.log(err));
};

export const getTrainModules =
  (init = false, page_url: string|null = "") =>
  (dispach: Dispatch<Action>) => {
    let url: any = BASE_API_URL + "app/train_module/";
    if (!init && url !== null) {
      url = page_url;
    }
    axios.get(url).then((response) => {
      dispach({ type: ActionType.GET_TRAIN_MODULES, payload: response.data });
    });
  };
