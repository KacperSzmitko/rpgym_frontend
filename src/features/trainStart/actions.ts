import { Dispatch } from "redux";
import axios from "axios";
import { BASE_API_URL } from "../../common/constans";
import { allPlansFetched } from "../plans/planSlice";
import { currentPlanFetched } from "./trainStartSlice";
import { RootState } from "../../app/store";

export const getCurrentPlanOrAll =
  () => (dispach: Dispatch, getState: () => RootState) => {
    axios
      .get(BASE_API_URL + "app/plan/current")
      .then((response) => {
        if (response.status === 200) {
          dispach(currentPlanFetched(response.data));
        } else if (response.status === 201) {
          let allPlansCount = getState().planSlice.plans_info.count;
          let currentPlansCount = getState().planSlice.plans.length;
          if (allPlansCount === -1 || currentPlansCount < allPlansCount) {
            dispach(allPlansFetched(response.data));
          }
        }
      })
      .catch((err) => console.log(err));
  };
