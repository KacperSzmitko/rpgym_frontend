import React, { useEffect } from "react";
import { useAppSelector } from "../state/hooks";
import Listing from "./Listing";
import { ActionType } from "../state/action-types/mainTypes";
import CreatePlan from "./CreatePlan";
import PlanItem from "./PlanItem";
import { useAppDispatch } from "../state/hooks";
import { getAllModules } from "../state/actions/mainActions";

export default function PlansListing() {
  const plansInfo = useAppSelector((state) => state.main.plans_info);
  const plans = useAppSelector((state) => state.main.plans);
  const modules = useAppSelector((state) => state.main.train_modules);
  const modulesInfo = useAppSelector((state) => state.main.train_modules_info);
  const dispach = useAppDispatch();

  useEffect(() => {
    if (modules.length < modulesInfo.count || modulesInfo.count === -1) {
      dispach(getAllModules());
    }
  }, []);

  return (
    <div>
      <CreatePlan />
      <Listing
        listInfo={plansInfo}
        itemsData={plans}
        itemComponent={PlanItem}
        fetchAction={ActionType.GET_NEXT_PLANS}
        path="app/plan/"
      />
    </div>
  );
}
