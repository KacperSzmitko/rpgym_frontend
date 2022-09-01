import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks";
import { getCurrentPlanOrAll } from "./actions";

function TrainStart() {
  const currentPlan = useAppSelector(
    (state) => state.trainStartSlice.currentPlan
  );
  const dispach = useAppDispatch();

  useEffect(() => {
    if (currentPlan === null) dispach(getCurrentPlanOrAll());
  }, []);

  return currentPlan === null ? (
    <div>Wybierz trening</div>
  ) : (
    <div>Rozpocznij trening</div>
  );
}
export default TrainStart;
