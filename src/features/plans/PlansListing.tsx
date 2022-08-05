import React, { useEffect } from "react";
import { useAppSelector } from "../../common/hooks";
import Listing from "../../common/Listing";
import CreatePlan from "./CreatePlan";
import PlanItem from "./PlanItem";
import { useAppDispatch } from "../../common/hooks";
import { getAllModules } from "../trainModules/actions";
import { nextPlansFetched } from "./planSlice";

export default function PlansListing() {
  const plansInfo = useAppSelector((state) => state.planSlice.plans_info);
  const plans = useAppSelector((state) => state.planSlice.plans);
  const modules = useAppSelector(
    (state) => state.trainModuleSlice.train_modules
  );
  const modulesInfo = useAppSelector(
    (state) => state.trainModuleSlice.train_modules_info
  );
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
        fetchAction={nextPlansFetched}
        path="app/plan/"
      />
    </div>
  );
}
