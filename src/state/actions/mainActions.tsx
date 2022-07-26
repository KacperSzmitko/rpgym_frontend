import { Dispatch } from "redux";
import axios from "axios";
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
  async (dispach: Dispatch<Action>) => {
    // If init is set TWO pages will be fetched
    if (page_size === null) {
      page_size = redux_info_obj.items_per_page;
    }
    let url: any = BASE_API_URL + path;
    if (!init && url !== null) {
      url = page_url;
    }
    let response = await axios
      .get(url, { params: { page_size: page_size } })
      .then((response) => {
        dispach({
          type: action,
          payload: response.data,
        });
        return { status: response.status, next: response.data.next };
      })
      .catch((err) => err.response.status);
    if (init && response.status === 200 && response.next !== null) {
      response = await axios
        .get(response.next, {
          params: { page_size: page_size },
        })
        .then((response) => {
          dispach({
            type: action,
            payload: response.data,
          });
          return { status: response.status };
        })
        .catch((err) => err.response.status);
    }
    return response.status;
  };

export const deleteListItem =
  (
    delete_action: ActionType,
    update_cache_action: ActionType,
    set_next_page_action: ActionType,
    path: string,
    next: string,
    id: number
  ) =>
  async (dispach: Dispatch<Action>) => {
    let nextOnServer = null;
    if (next !== null) {
      nextOnServer = axios
        .get(next)
        .then((response) => {
          return response.data.results[0];
        })
        .catch((err) => {
          dispach({
            type: set_next_page_action,
            payload: null,
          });
        });
    }
    let status = await axios
      .delete(BASE_API_URL + `${path}/${id}/`)
      .then((response) => {
        dispach({ type: delete_action, payload: id });
        return response.status;
      })
      .catch((err) => console.log(err));
    if (status === 204 && nextOnServer !== null) {
      const itemToAdd = await nextOnServer;
      dispach({
        type: update_cache_action,
        payload: itemToAdd,
      });
    }
  };

export const createListItem =
  (path: string, action: ActionType, data: any) =>
  (dispach: Dispatch<Action>) => {
    axios
      .post(BASE_API_URL + path, data)
      .then((response) => {
        dispach({ type: action, payload: response.data });
      })
      .catch((err) => console.log(err));
  };

export const getExercises = () => (dispach: Dispatch<Action>) => {
  axios
    .get(BASE_API_URL + "app/exercises/")
    .then((response) => {
      dispach({ type: ActionType.GET_EXERCISES, payload: response.data });
    })
    .catch((err) => console.log(err));
};

export const getMuscleParts = () => (dispach: Dispatch<Action>) => {
  axios
    .get(BASE_API_URL + "app/muscle_parts/")
    .then((response) => {
      dispach({ type: ActionType.GET_MUSCLE_PARTS, payload: response.data });
    })
    .catch((err) => console.log(err));
};


export const getAllModules = () => (dispach: Dispatch<Action>) => {
  axios.
    get(BASE_API_URL + 'app/train_module/all/')
    .then(response => {
      dispach({ type: ActionType.GET_ALL_MODULES, payload: response.data });
    })
    .catch((err) => console.log(err));
}