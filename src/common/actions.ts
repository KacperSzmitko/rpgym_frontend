import { Dispatch } from "redux";
import axios from "axios";
import { BASE_API_URL } from "./constans";
import { ListingInfo } from "./types";

export const getNextListItems =
  (
    action: any,
    path: string,
    redux_info_obj: ListingInfo,
    init = false,
    page_url: string | null = "",
    page_size: number | null = null
  ) =>
  async (dispach: Dispatch) => {
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
        dispach(action(response.data));
        return { status: response.status, next: response.data.next };
      })
      .catch((err) => err.response.status);
    if (init && response.status === 200 && response.next !== null) {
      response = await axios
        .get(response.next, {
          params: { page_size: page_size },
        })
        .then((response) => {
          dispach(action(response.data));
          return { status: response.status };
        })
        .catch((err) => err.response.status);
    }
    return response.status;
  };

export const deleteListItem =
  (
    delete_action: any,
    update_cache_action: any,
    set_next_page_action: any,
    path: string,
    next: string,
    id: number
  ) =>
  async (dispach: Dispatch) => {
    let nextOnServer = null;
    if (next !== null) {
      nextOnServer = axios
        .get(next)
        .then((response) => {
          return response.data.results[0];
        })
        .catch((err) => {
          dispach(set_next_page_action(null));
        });
    }
    let status = await axios
      .delete(BASE_API_URL + `${path}/${id}/`)
      .then((response) => {
        dispach(delete_action(id));
        return response.status;
      })
      .catch((err) => console.log(err));
    if (status === 204 && nextOnServer !== null) {
      const itemToAdd = await nextOnServer;
      dispach(update_cache_action(itemToAdd));
    }
  };

export const createListItem =
  (path: string, action: any, data: any) => (dispach: Dispatch) => {
    axios
      .post(BASE_API_URL + path, data)
      .then((response) => {
        dispach(action(response.data));
      })
      .catch((err) => console.log(err));
  };
