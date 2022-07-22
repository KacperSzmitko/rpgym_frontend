import { Dispatch } from "redux";
import axios, { Axios } from "axios";
import { BASE_API_URL } from "../../constans";
import { Action, ActionType, ListingInfo } from "../action-types/mainTypes";
import { RootState } from "../store";

export const getMuscleLevels = () => (dispach: Dispatch<Action>) => {
  axios
    .get(BASE_API_URL + "app/muscle_levels/")
    .then((response) => {
      dispach({ type: ActionType.MUSCLE_LEVELS, payload: response.data });
    })
    .catch((err) => console.log(err));
};

export const getNextListItems =
  (
    action: ActionType,
    path: string,
    redux_info_obj: ListingInfo,
    init = false,
    page_url: string | null = "",
    page_size: number | null = null
  ) =>
  async (dispach: Dispatch<Action>, getState: () => RootState) => {
    // If init is set TWO pages will be fetched
    if (page_size === null) {
      page_size = getState().main.train_modules_info.items_per_page;
    }
    let url: any = BASE_API_URL + path;
    if (!init && url !== null) {
      url = page_url;
    }
    let status = await axios
      .get(url, { params: { page_size: page_size } })
      .then((response) => {
        dispach({
          type: action,
          payload: response.data,
        });
        return response.status;
      })
      .catch((err) => err.response.status);
    if (
      init &&
      status === 200 &&
      redux_info_obj.next !== null
    ) {
      status = await axios
        .get(redux_info_obj.next, {
          params: { page_size: page_size },
        })
        .then((response) => {
          dispach({
            type: action,
            payload: response.data,
          });
          return response.status;
        })
        .catch((err) => err.response.status);
    }
    return status;
  };

export const deleteListItem =
  (id: number) =>
  async (dispach: Dispatch<Action>, getState: () => RootState) => {
    const module_info = getState().main.train_modules_info;
    let nextOnServer = null;
    if (module_info.next !== null){
    nextOnServer = axios
      .get(module_info.next)
      .then((response) => {
        return response.data.results[0];
      })
      .catch((err) => {        dispach({
        type: ActionType.SET_NEXT_MODULE_PAGE,
        payload: null,
      });});
    }
    let status = await axios
      .delete(BASE_API_URL + `app/train_module/${id}/`)
      .then((response) => {
        dispach({ type: ActionType.DELETE_TRAIN_MODULE, payload: id });
        return response.status;
      })
      .catch((err) => console.log(err));
    if (status === 204 && nextOnServer !== null) {
      const itemToAdd = await nextOnServer;
      dispach({
        type: ActionType.UPDATE_MODULES_CACHE,
        payload: itemToAdd,
      });
      // Update cache
    }
  };
